(() => {
    'use strict';
    const T = window.APP.t;
    const $ = (id) => document.getElementById(id);

    const overlay = $('overlay'),
        formStep = $('step-form'),
        stateStep = $('step-state');
    const phoneEl = $('phone'),
        payBtn = $('m-pay'),
        formErr = $('form-err');
    const provBtns = Array.from(document.querySelectorAll('.prov'));
    const POLL_MS = 3000,
        POLL_MAX_MS = 150000;

    let selected = null,
        provider = null,
        pollTimer = null,
        pollStart = 0,
        currentRef = null;

    /* ---------- network tabs ---------- */
    document.querySelectorAll('.tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            const network = tab.dataset.net;
            document.documentElement.dataset.network = network;
            document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--brand-deep').trim();
            document.querySelectorAll('.tab').forEach((t) => {
                const isSelected = t === tab;
                t.classList.toggle('on', isSelected);
                t.setAttribute('aria-selected', String(isSelected));
            });
            document.querySelectorAll('[data-panel]').forEach((p) => {
                p.hidden = p.dataset.panel !== network;
            });
        });
    });

    /* ---------- payment network chips ---------- */
    function setProvider(key) {
        provider = key;
        provBtns.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.p === key)));
    }
    provBtns.forEach((b) => b.addEventListener('click', () => {
        setProvider(b.dataset.p);
        formErr.hidden = true;
    }));

    /* ---------- phone helpers ---------- */
    function normalize(v) {
        let d = v.replace(/\D+/g, '');
        if (d.startsWith('255')) d = d.slice(3);
        else if (d.startsWith('0')) d = d.slice(1);
        return /^[67]\d{8}$/.test(d) ? d : null;
    }

    /* ---------- modal ---------- */
    function openModal(btn) {
        selected = {
            id: btn.dataset.id,
            name: btn.dataset.net + ' ' + btn.dataset.data,
            price: btn.dataset.price
        };
        $('sum-name').textContent = selected.name;
        $('sum-price').textContent = selected.price;
        payBtn.textContent = T.pay_btn + ' ' + selected.price;
        payBtn.disabled = false;
        setProvider(btn.dataset.netkey); // default to the bundle's network; the customer can change it
        showForm();
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
        setTimeout(() => phoneEl.focus(), 60);
    }

    function closeModal() {
        stopPolling();
        overlay.hidden = true;
        document.body.style.overflow = '';
    }

    function showForm() {
        stateStep.hidden = true;
        formStep.hidden = false;
        formErr.hidden = true;
        payBtn.disabled = false;
        if (selected) payBtn.textContent = T.pay_btn + ' ' + selected.price;
    }

    function showState(kind, title, text, actions) {
        formStep.hidden = true;
        stateStep.hidden = false;
        const icon = $('state-icon');
        icon.className = 'state ' + kind;
        icon.innerHTML = kind === 'ok' ?
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>' :
            kind === 'bad' ?
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' :
            '';
        $('state-title').textContent = title;
        $('state-text').textContent = text;
        const box = $('state-actions');
        box.innerHTML = '';
        (actions || []).forEach(([label, cls, fn]) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = cls;
            b.textContent = label;
            b.addEventListener('click', fn);
            box.appendChild(b);
        });
    }

    function renderNetworkMenu(panel, networkKey, network) {
        panel.replaceChildren();
        panel.classList.add('network-menu');

        const poster = document.createElement('figure');
        poster.className = 'network-poster';
        const image = document.createElement('img');
        image.src = network.image;
        image.alt = network.alt;
        image.loading = networkKey === 'vodacom' ? 'eager' : 'lazy';
        image.decoding = 'async';
        poster.appendChild(image);
        panel.appendChild(poster);

        const disclosure = document.createElement('details');
        disclosure.className = 'offer-disclosure';
        const summary = document.createElement('summary');
        summary.textContent = 'Chagua kifurushi cha kulipia';
        disclosure.appendChild(summary);

        const groups = document.createElement('div');
        groups.className = 'offer-groups';
        network.groups.forEach((group) => {
            const section = document.createElement('section');
            section.className = 'offer-group';
            const heading = document.createElement('h3');
            heading.textContent = group.title;
            section.appendChild(heading);

            const offers = document.createElement('div');
            offers.className = 'offer-grid';
            group.packages.forEach((bundle) => {
                const card = document.createElement('article');
                card.className = 'offer-card';

                const details = document.createElement('div');
                details.className = 'offer-info';
                const label = document.createElement('strong');
                label.textContent = bundle.label;
                details.appendChild(label);
                if (bundle.duration) {
                    const duration = document.createElement('span');
                    duration.textContent = bundle.duration;
                    details.appendChild(duration);
                }

                const price = document.createElement('span');
                price.className = 'offer-price';
                price.textContent = `TSh ${bundle.price.toLocaleString('en-US')}`;

                const buy = document.createElement('button');
                buy.type = 'button';
                buy.className = 'buy offer-buy';
                buy.textContent = 'Nunua';
                buy.dataset.id = bundle.id;
                buy.dataset.netkey = networkKey;
                buy.dataset.net = network.name;
                buy.dataset.data = bundle.label + (bundle.duration ? ` · ${bundle.duration}` : '');
                buy.dataset.price = price.textContent;

                card.append(details, price, buy);
                offers.appendChild(card);
            });
            section.appendChild(offers);
            groups.appendChild(section);
        });
        disclosure.appendChild(groups);
        panel.appendChild(disclosure);
        panel.classList.add('menu-ready');
    }

    document.querySelectorAll('.grid[data-panel]').forEach((panel) => {
        const networkKey = panel.dataset.panel;
        const network = window.BUNDLE_CATALOG[networkKey];
        if (network) renderNetworkMenu(panel, networkKey, network);
        panel.addEventListener('click', (event) => {
            const button = event.target.closest('.buy');
            if (button && panel.contains(button)) openModal(button);
        });
    });
    $('m-x').addEventListener('click', closeModal);
    $('m-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });

    /* ---------- submit: ask the server to send the STK push ---------- */
    formStep.addEventListener('submit', async (e) => {
        e.preventDefault();
        formErr.hidden = true;
        if (!provider) {
            formErr.textContent = T.err_provider;
            formErr.hidden = false;
            return;
        }
        const local = normalize(phoneEl.value);
        if (!local) {
            formErr.textContent = T.err_phone;
            formErr.hidden = false;
            phoneEl.focus();
            return;
        }
        payBtn.disabled = true;
        const label = payBtn.textContent;
        payBtn.textContent = T.sending;

        try {
            const res = await fetch('/api/collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    package: selected.id,
                    provider,
                    phone: '0' + local
                }),
                credentials: 'same-origin'
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.ok) {
                formErr.textContent = data.error || T.err_generic;
                formErr.hidden = false;
                if (data.debug) console.warn('Gateway debug', data.debug);
                payBtn.disabled = false;
                payBtn.textContent = label;
                return;
            }
            currentRef = data.uuid;
            showState('wait', T.wait_title, T.wait_text.replace('%s', data.phone), [
                [T.close, 'ghost', closeModal]
            ]);
            startPolling();
        } catch (err) {
            formErr.textContent = T.err_network;
            formErr.hidden = false;
            payBtn.disabled = false;
            payBtn.textContent = label;
        }
    });

    /* ---------- poll payment status ---------- */
    function stopPolling() {
        if (pollTimer) {
            clearTimeout(pollTimer);
            pollTimer = null;
        }
    }

    function startPolling() {
        stopPolling();
        pollStart = Date.now();
        tick();
    }

    async function tick() {
        try {
            const res = await fetch('/api/status?uuid=' + encodeURIComponent(currentRef), {
                cache: 'no-store'
            });
            const data = await res.json();
            if (data.status === 'completed') {
                showState('ok', T.ok_title, T.ok_text, [
                    [T.close, 'go', closeModal]
                ]);
                return;
            }
            if (data.status === 'failed') {
                showState('bad', T.fail_title, T.fail_text, [
                    [T.close, 'ghost', closeModal],
                    [T.retry, 'go', showForm],
                ]);
                return;
            }
        } catch (e) { /* transient network error: keep polling */ }

        if (Date.now() - pollStart > POLL_MAX_MS) {
            showState('wait', T.wait_title, T.timeout_text, [
                [T.close, 'ghost', closeModal],
                [T.check_again, 'go', () => {
                    showState('wait', T.wait_title, '', [
                        [T.close, 'ghost', closeModal]
                    ]);
                    startPolling();
                }],
            ]);
            return;
        }
        pollTimer = setTimeout(tick, POLL_MS);
    }
})();
