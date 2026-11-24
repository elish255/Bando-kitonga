(function (root) {
  const catalog = {
    vodacom: {
      name: 'Vodacom',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000005fec820e83cc58b68eb18629-hsOmMSZ696MNxH5dc5H1k6NJBZ8iWz.webp',
      imageSet: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000005fec820e83cc58b68eb18629-hsOmMSZ696MNxH5dc5H1k6NJBZ8iWz.webp 1254w',
      imageWidth: 1254,
      imageHeight: 1254,
      alt: 'Picha ya vifurushi vya Vodacom Combo Plan',
      groups: [
        {
          title: 'Combo Plan',
          packages: [
            { id: 'vodacom-combo-1', label: 'GB 25 + DK 500 + SMS 1,000', price: 10000 },
            { id: 'vodacom-combo-2', label: 'GB 30 + DK 1,200 + SMS 1,500', price: 15000 },
            { id: 'vodacom-combo-3', label: 'GB 45 + DK 1,800 + SMS 2,000', price: 25000 },
            { id: 'vodacom-combo-4', label: 'GB 60 + DK 2,000 + SMS 2,500', price: 42000 },
            { id: 'vodacom-combo-5', label: 'GB 82 + DK 2,200 + SMS 3,000', price: 50000 },
            { id: 'vodacom-combo-6', label: 'GB 120 + DK 3,000 + SMS 4,000', price: 68000 },
          ],
        },
      ],
    },
    yas: {
      name: 'Yas',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000073a881fa98531c12fd7dde1b-szFhcOJIsPYBRy9l5hNynjkq6jcGXP.png',
      imageSet: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000073a881fa98531c12fd7dde1b-szFhcOJIsPYBRy9l5hNynjkq6jcGXP.png 1254w',
      imageWidth: 1254,
      imageHeight: 1254,
      alt: 'Picha ya vifurushi vya Yas Combo',
      groups: [
        {
          title: 'Vifurushi vya Combo',
          packages: [
            { id: 'yas-combo-1', label: 'GB 10 + DK 500 + SMS 100', price: 8000 },
            { id: 'yas-combo-2', label: 'GB 22 + DK 1,200 + SMS 2,000', price: 15000 },
            { id: 'yas-combo-3', label: 'GB 35 + DK 1,500 + SMS 22,000', price: 22000 },
            { id: 'yas-combo-4', label: 'GB 60 + DK 2,000 + SMS 3,000', price: 45000 },
            { id: 'yas-combo-5', label: 'GB 135 + DK 3,000 + SMS 35,000', price: 90000 },
          ],
        },
      ],
    },
    airtel: {
      name: 'Airtel',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000097d881fa89f1f535c73419fe-imR9C3mjuM61h8jzFs1fQeOf0jYHRF.png',
      imageSet: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000097d881fa89f1f535c73419fe-imR9C3mjuM61h8jzFs1fQeOf0jYHRF.png 1254w',
      imageWidth: 1254,
      imageHeight: 1254,
      alt: 'Picha ya vifurushi vya Airtel Combo Bando',
      groups: [
        {
          title: 'Combo Bando',
          packages: [
            { id: 'airtel-combo-1', label: 'GB 25 + Dakika 800 + SMS 10,000', price: 10000 },
            { id: 'airtel-combo-2', label: 'GB 30 + Dakika 1,000 + SMS 12,000', price: 12000 },
            { id: 'airtel-combo-3', label: 'GB 45 + Dakika 1,500 + SMS 20,000', price: 25000 },
            { id: 'airtel-combo-4', label: 'GB 50 + Dakika 2,000 + SMS 25,000', price: 42000 },
            { id: 'airtel-combo-5', label: 'GB 80 + Dakika 3,000 + SMS 30,000', price: 50000 },
          ],
        },
      ],
    },
    halotel: {
      name: 'Halotel',
      image: 'assets/network-posters/halotel.webp',
      imageSet: 'assets/network-posters/640/halotel.webp 640w, assets/network-posters/halotel.webp 1280w',
      imageWidth: 1280,
      imageHeight: 1235,
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
