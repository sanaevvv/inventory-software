'use server';

import prisma from '@/lib/prisma';
import { registerSchema, RegisterSchemaType } from '@/lib/schema';
import bcrypt from 'bcryptjs';
import { signOut } from '@/auth';

export async function user(data: RegisterSchemaType) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
      message: 'データの形式が正しくありません。入力データを確認してください。',
    };
  }

  try {
    // ユーザー名の重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'このユーザーは既に使用されています。',
      };
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    // ユーザーの作成
    const newUser = await prisma.user.create({
      data: {
        name: result.data.username,
        email: result.data.email,
        hashedPassword: hashedPassword,
      },
    });

    return {
      success: true,
      message: 'ユーザーが正常に登録されました。',
    };
  } catch (error) {
    return {
      message: `ユーザー登録に失敗しました。もう一度お試しください。`,
      success: false,
      errors: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        name: true,
        email: true,
        hashedPassword: true
      }
    });
    return user;
  } catch {
    return null;
  }
};

export async function logOut() {
  await signOut();
}
