'use server';

import prisma from '@/lib/prisma';

export async function getFormattedItems() {
  const items = await prisma.item.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return items.map((item) => ({
    value: item.title,
    text: item.title,
  }));
}

export async function getFormattedWarehouses() {
  const warehouses = await prisma.warehouse.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return warehouses.map((warehouse) => ({
    value: warehouse.name,
    text: warehouse.name,
  }));
}

export async function getFormattedCategories() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return categories.map((category) => ({
    value: category.title,
    text: category.title,
  }));
}

export async function getFormattedBrands() {
  const brands = await prisma.brand.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return brands.map((brand) => ({
    value: brand.brandname,
    text: brand.brandname,
  }));
}
export async function getFormattedUnits() {
  const units = await prisma.unit.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return units.map((unit) => ({
    value: unit.title,
    text: unit.title,
  }));
}

export async function getFormattedSuppliers() {
  const suppliers = await prisma.supplier.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return suppliers.map((supplier) => ({
    value: supplier.name,
    text: supplier.name,
  }));
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
export async function getCategoryById(id: string) {
  return await prisma.category.findUnique({
    where: { id: Number(id) },
  });
}
export async function getSuppliers() {
  return await prisma.supplier.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
export async function getSupplierById(id: string) {
  return await prisma.supplier.findUnique({
    where: { id: Number(id) },
  });
}

export async function getBrands() {
  return await prisma.brand.findMany({
    select: {
      id: true,
      brandname: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
export async function getBrand(id: string) {
  return await prisma.brand.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      brandname: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getItemById(id: string) {
  return await prisma.item.findUnique({
    where: { id: Number(id) },
    include: {
      warehouse: {
        select: {
          name: true,
        }
      },
      category: {
        select: {
          title: true,
        },
      },
      supplier: {
        select: {
          name: true,
        },
      },
      brand: {
        select: {
          brandname: true,
        },
      },
      unit: {
        select: {
          title: true,
        },
      },
    },
  });
}

export async function getUnits() {
  return await prisma.unit.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getUnit(id: string) {
  return await prisma.unit.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export async function getWarehouses() {
  return await prisma.warehouse.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getItems() {
  const items = await prisma.item.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
      warehouse: true,
      // supplier: true,
    },
  });

  return items;
}

export async function getWarehouseById(id: string) {
  return await prisma.warehouse.findUnique({
    where: {
      id: Number(id),
    },
  });
}
export async function getAdjustmentAdd() {
  return await prisma.addStockAdjustment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      item: true,
      supplier: true,
      warehouse: true
    }
  });
}
export async function getTransfer() {
  return await prisma.transferStockAdjustment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      item: true,
      givingWarehouse: true,
      receivingWarehouse: true
    },
  });
}

export async function getTransferById(id: string) {
  return await prisma.transferStockAdjustment.findUnique({
    where: { id: Number(id) },
    include: {
      givingWarehouse: {
        select: { name: true },
      },
      receivingWarehouse: {
        select: { name: true },
      },
      item: {
        select: { title: true },
      },
    },
  });
}

export async function getAddById(id: string) {
  const addStockAdjustment = await prisma.addStockAdjustment.findUnique({
    where: { id: Number(id) },
    include: {
      item: true,
      supplier: true,
      warehouse: true,
    },
  });

  // const formattedData = {

  // }
  // console.log('addStockAdjustment', addStockAdjustment);

  return addStockAdjustment;
}
