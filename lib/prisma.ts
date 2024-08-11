import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { D1Database } from '@cloudflare/workers-types';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    adapter: new PrismaD1(process.env.DB as unknown as D1Database),
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

// import { PrismaClient } from '@prisma/client';
// import { PrismaD1 } from '@prisma/adapter-d1';
// import { D1Database } from '@cloudflare/workers-types';

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// let prisma: PrismaClient;

// if (!global.prisma) {
//   global.prisma = new PrismaClient({
//     adapter: new PrismaD1(process.env.DB as unknown as D1Database),
//   });
// }
// prisma = global.prisma;

// export default prisma;
