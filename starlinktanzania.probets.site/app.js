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

    document.querySelectorAll('.buy').forEach((b) => b.addEventListener('click', () => openModal(b)));
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
            const body = new URLSearchParams({
                csrf: window.APP.csrf,
                package: selected.id,
                provider,
                phone: '0' + local
            });
            const res = await fetch('pay.php', {
                method: 'POST',
                body,
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
            currentRef = data.reference;
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
            const res = await fetch('status.php?ref=' + encodeURIComponent(currentRef), {
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
