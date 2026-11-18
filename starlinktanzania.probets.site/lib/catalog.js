(function (root) {
  const catalog = {
    vodacom: {
      name: 'Vodacom',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000009e4c821188cb4cbe90ed484c-A7AXYqZs9iRqxdasFP7P3IYShNnwbe.png',
      imageSet: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000009e4c821188cb4cbe90ed484c-A7AXYqZs9iRqxdasFP7P3IYShNnwbe.png 1254w',
      imageWidth: 1254,
      imageHeight: 1254,
      alt: 'Picha ya vifurushi vya Vodacom: Data Plan na Combo Plan za mwezi mmoja',
      groups: [
        {
          title: 'Data Plan · Siku 30',
          packages: [
            { id: 'vodacom-data-1', label: 'GB 10', duration: 'Siku 30', price: 10000 },
            { id: 'vodacom-data-2', label: 'GB 15', duration: 'Siku 30', price: 12000 },
            { id: 'vodacom-data-3', label: 'GB 30', duration: 'Siku 30', price: 25000 },
            { id: 'vodacom-data-4', label: 'GB 60', duration: 'Siku 30', price: 42000 },
            { id: 'vodacom-data-5', label: 'GB 75', duration: 'Siku 30', price: 50000 },
            { id: 'vodacom-data-6', label: 'GB 100', duration: 'Siku 30', price: 68000 },
            { id: 'vodacom-data-7', label: 'GB 150', duration: 'Siku 30', price: 90000 },
          ],
        },
        {
          title: 'Combo Plan · Siku 30',
          packages: [
            { id: 'vodacom-combo-1', label: 'GB 7 + DKK 500 + SMS 100', duration: 'Siku 30', price: 10000 },
            { id: 'vodacom-combo-2', label: 'GB 10 + DKK 1,000 + SMS 100', duration: 'Siku 30', price: 12000 },
            { id: 'vodacom-combo-3', label: 'GB 20 + DKK 1,500 + SMS 100', duration: 'Siku 30', price: 25000 },
            { id: 'vodacom-combo-4', label: 'GB 50 + DKK 2,000 + SMS 100', duration: 'Siku 30', price: 42000 },
            { id: 'vodacom-combo-5', label: 'GB 60 + DKK 3,000 + SMS 100', duration: 'Siku 30', price: 50000 },
            { id: 'vodacom-combo-6', label: 'GB 80 + DKK 5,000 + SMS 100', duration: 'Siku 30', price: 68000 },
            { id: 'vodacom-combo-7', label: 'GB 120 + DKK 8,000 + SMS 100', duration: 'Siku 30', price: 90000 },
          ],
        },
      ],
    },
    yas: {
      name: 'Yas',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000f2b48211a652fae512069a11-8DriDhgEoEKhTsrcZEOKEWOn33pG8L.png',
      imageSet: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000f2b48211a652fae512069a11-8DriDhgEoEKhTsrcZEOKEWOn33pG8L.png 1254w',
      imageWidth: 1254,
      imageHeight: 1254,
      alt: 'Picha ya vifurushi vya Yas: Internet na Combo kwa mwezi mmoja',
      groups: [
        {
          title: 'Vifurushi vya Internet',
          packages: [
            { id: 'yas-data-1', label: 'GB 10', price: 8000 },
            { id: 'yas-data-2', label: 'GB 22', price: 15000 },
            { id: 'yas-data-3', label: 'GB 35', price: 22000 },
            { id: 'yas-data-4', label: 'GB 60', price: 45000 },
            { id: 'yas-data-5', label: 'GB 125', price: 90000 },
          ],
        },
        {
          title: 'Vifurushi vya Combo',
          packages: [
            { id: 'yas-combo-1', label: 'GB 5 + DK 500 + SMS 100', price: 8000 },
            { id: 'yas-combo-2', label: 'GB 15 + DK 1,000 + SMS 100', price: 15000 },
            { id: 'yas-combo-3', label: 'GB 25 + DK 1,500 + SMS 100', price: 22000 },
            { id: 'yas-combo-4', label: 'GB 45 + DK 2,500 + SMS 100', price: 45000 },
            { id: 'yas-combo-5', label: 'GB 96 + DK 5,000 + SMS 100', price: 90000 },
          ],
        },
      ],
    },
    airtel: {
      name: 'Airtel',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000000ae48211bb4ac44820b94921-4IcNdKZeVIYeS98AlAbBUyf9hZRhGO.png',
      imageSet: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000000ae48211bb4ac44820b94921-4IcNdKZeVIYeS98AlAbBUyf9hZRhGO.png 1254w',
      imageWidth: 1254,
      imageHeight: 1254,
      alt: 'Picha ya vifurushi vya Airtel: Data Bando na Combo Bando za mwezi mmoja',
      groups: [
        {
          title: 'Data Bando · Mwezi',
          packages: [
            { id: 'airtel-data-1', label: 'GB 10', duration: 'Mwezi', price: 10000 },
            { id: 'airtel-data-2', label: 'GB 15', duration: 'Mwezi', price: 12000 },
            { id: 'airtel-data-3', label: 'GB 30', duration: 'Mwezi', price: 25000 },
            { id: 'airtel-data-4', label: 'GB 60', duration: 'Mwezi', price: 42000 },
            { id: 'airtel-data-5', label: 'GB 75', duration: 'Mwezi', price: 50000 },
          ],
        },
        {
          title: 'Combo Bando',
          packages: [
            { id: 'airtel-combo-1', label: 'GB 7 + Dakika 500', price: 10000 },
            { id: 'airtel-combo-2', label: 'GB 10 + Dakika 1,000', price: 12000 },
            { id: 'airtel-combo-3', label: 'GB 20 + Dakika 1,500', price: 25000 },
            { id: 'airtel-combo-4', label: 'GB 50 + Dakika 2,000', price: 42000 },
            { id: 'airtel-combo-5', label: 'GB 60 + Dakika 3,000', price: 50000 },
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
