export default {
  processors: [
    {
      id: "XEON E5 2640 V4",
      name: "Intel Xeon E5 2640 V4",
      price: 100,
    },
    {
      id: "XEON E5 2680 V4",
      name: "Intel Xeon E5 2680 V4",
      price: 70,
    },
  ],
  motherboards: [
    {
      id: "Kllisre X99",
      name: "Kllisre X99",
      support_cpu: ["XEON E5 2640 V4", "XEON E5 2680 V4"],
      price: 200,
    },
    {
      id: "huananzhi x99 qd4",
      name: "Huananzhi X99 QD4",
      support_cpu: ["XEON E5 2640 V4", "XEON E5 2680 V4"],
      price: 200,
    },
  ],
  ram: [
    16,32,64,128
  ],
  storage: {
    hdd: [{
      id: "Seagate 6Tb",
      name: "Seagate 6Tb",
    },
    {
      id: "Seagate 2Tb",
      name: "Seagate 2Tb",
    }],
    ssd: [{
      id: "SSD ADATA LEGEND 900 512GB M.2 NVMe",
      name: "SSD ADATA LEGEND 900 512GB M.2 NVMe",
    },
    {
      id: "SSD 512 Gb ADATA SU650 SATA",
      name: "SSD 512 Gb ADATA SU650 SATA",
    }],
  },
  
};
