(function (root) {
  const catalog = {
    vodacom: {
      name: 'Vodacom',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000001d08211b68b49d0d530de1d-TPUhkzPgnMNMF7moo9HefMHY5tc4Rq.png',
      alt: 'Picha ya vifurushi vya Vodacom SME: Data Plan na Combo Plan',
      groups: [
        {
          title: 'Data Plan · Siku 30',
          packages: [
            { id: 'vodacom-data-1', label: 'GB 10', duration: 'Siku 30', price: 15000 },
            { id: 'vodacom-data-2', label: 'GB 15', duration: 'Siku 30', price: 20000 },
            { id: 'vodacom-data-3', label: 'GB 30', duration: 'Siku 30', price: 30000 },
            { id: 'vodacom-data-4', label: 'GB 60', duration: 'Siku 30', price: 50000 },
            { id: 'vodacom-data-5', label: 'GB 75', duration: 'Siku 30', price: 60000 },
            { id: 'vodacom-data-6', label: 'GB 100', duration: 'Siku 30', price: 75000 },
            { id: 'vodacom-data-7', label: 'GB 150', duration: 'Siku 30', price: 100000 },
          ],
        },
        {
          title: 'Combo Plan · Siku 30',
          packages: [
            { id: 'vodacom-combo-1', label: 'GB 7 + DKK 500 + SMS 100', duration: 'Siku 30', price: 15000 },
            { id: 'vodacom-combo-2', label: 'GB 10 + DKK 1,000 + SMS 100', duration: 'Siku 30', price: 20000 },
            { id: 'vodacom-combo-3', label: 'GB 20 + DKK 1,500 + SMS 100', duration: 'Siku 30', price: 30000 },
            { id: 'vodacom-combo-4', label: 'GB 50 + DKK 2,000 + SMS 100', duration: 'Siku 30', price: 50000 },
            { id: 'vodacom-combo-5', label: 'GB 60 + DKK 3,000 + SMS 100', duration: 'Siku 30', price: 60000 },
            { id: 'vodacom-combo-6', label: 'GB 80 + DKK 5,000 + SMS 100', duration: 'Siku 30', price: 75000 },
            { id: 'vodacom-combo-7', label: 'GB 120 + DKK 8,000 + SMS 100', duration: 'Siku 30', price: 100000 },
          ],
        },
      ],
    },
    yas: {
      name: 'Yas',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000049a88211b26b99cfb9a0640a-aqdg1T3SWC6fsFii1uukSxhtrDWbit.png',
      alt: 'Picha ya vifurushi vya Yas: internet na combo',
      groups: [
        {
          title: 'Vifurushi vya Internet',
          packages: [
            { id: 'yas-data-1', label: 'GB 10', price: 10000 },
            { id: 'yas-data-2', label: 'GB 22', price: 20000 },
            { id: 'yas-data-3', label: 'GB 35', price: 30000 },
            { id: 'yas-data-4', label: 'GB 60', price: 50000 },
            { id: 'yas-data-5', label: 'GB 125', price: 100000 },
          ],
        },
        {
          title: 'Vifurushi vya Combo',
          packages: [
            { id: 'yas-combo-1', label: 'GB 5 + DK 500 + SMS 100', price: 10000 },
            { id: 'yas-combo-2', label: 'GB 15 + DK 1,000 + SMS 100', price: 20000 },
            { id: 'yas-combo-3', label: 'GB 25 + DK 1,500 + SMS 100', price: 30000 },
            { id: 'yas-combo-4', label: 'GB 45 + DK 2,500 + SMS 100', price: 50000 },
            { id: 'yas-combo-5', label: 'GB 96 + DK 5,000 + SMS 100', price: 100000 },
          ],
        },
      ],
    },
    airtel: {
      name: 'Airtel',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000006c448211810564355a10656a-hX8MizhlbsRoRGKfoTuBrsJCX295TI.png',
      alt: 'Picha ya vifurushi vya Airtel: data na combo',
      groups: [
        {
          title: 'Data Bando · Mwezi',
          packages: [
            { id: 'airtel-data-1', label: 'GB 10', duration: 'Mwezi', price: 15000 },
            { id: 'airtel-data-2', label: 'GB 15', duration: 'Mwezi', price: 20000 },
            { id: 'airtel-data-3', label: 'GB 30', duration: 'Mwezi', price: 30000 },
            { id: 'airtel-data-4', label: 'GB 60', duration: 'Mwezi', price: 50000 },
            { id: 'airtel-data-5', label: 'GB 75', duration: 'Mwezi', price: 60000 },
          ],
        },
        {
          title: 'Combo Bando',
          packages: [
            { id: 'airtel-combo-1', label: 'GB 7 + Dakika 500', price: 15000 },
            { id: 'airtel-combo-2', label: 'GB 10 + Dakika 1,000', price: 20000 },
            { id: 'airtel-combo-3', label: 'GB 20 + Dakika 1,500', price: 30000 },
            { id: 'airtel-combo-4', label: 'GB 50 + Dakika 2,000', price: 50000 },
          ],
        },
      ],
    },
    halotel: {
      name: 'Halotel',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000013fc8207a93cc9b2ab973980-a0eMVhW50tRs0FO3CEBgaK2945cAFN.png',
      alt: 'Picha ya vifurushi vya Halotel Wiki 2 na Mwezi Mmoja',
      groups: [
        {
          title: 'Wiki 2',
          packages: [
            { id: 'halotel-wiki2-1', label: 'GB 5', duration: 'Wiki 2', price: 5000 },
            { id: 'halotel-wiki2-2', label: 'GB 6', duration: 'Wiki 2', price: 6000 },
            { id: 'halotel-wiki2-3', label: 'GB 7', duration: 'Wiki 2', price: 7000 },
            { id: 'halotel-wiki2-4', label: 'GB 8', duration: 'Wiki 2', price: 8000 },
            { id: 'halotel-wiki2-5', label: 'GB 9', duration: 'Wiki 2', price: 9000 },
            { id: 'halotel-wiki2-6', label: 'GB 10', duration: 'Wiki 2', price: 10000 },
          ],
        },
        {
          title: 'Mwezi Mmoja',
          packages: [
            { id: 'halotel-month-1', label: 'GB 10', duration: 'Mwezi Mmoja', price: 10000 },
            { id: 'halotel-month-2', label: 'GB 12', duration: 'Mwezi Mmoja', price: 12000 },
            { id: 'halotel-month-3', label: 'GB 13', duration: 'Mwezi Mmoja', price: 13000 },
            { id: 'halotel-month-4', label: 'GB 15', duration: 'Mwezi Mmoja', price: 15000 },
            { id: 'halotel-month-5', label: 'GB 20', duration: 'Mwezi Mmoja', price: 20000 },
            { id: 'halotel-month-6', label: 'GB 25', duration: 'Mwezi Mmoja', price: 25000 },
          ],
        },
      ],
    },
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = catalog;
  } else {
    root.BUNDLE_CATALOG = catalog;
  }
})(typeof window !== 'undefined' ? window : globalThis);
