import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import Footer from '@/app/_components/footer';

import { LoginForm } from './_components/login-form';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh place-items-center">
      <div className={`
        w-full max-w-sm
        md:max-w-4xl
      `}
      >
        <Card>
          <CardContent className="grid grid-cols-[1fr_auto_1fr] gap-8">
            <div className="flex flex-col items-center gap-2 p-4">
              <Image
                src="/logo.png"
                alt="ERP Logo"
                width={420}
                height={576}
                className="w-48"
                draggable="false"
              />
              <h1 className="text-center">
                <span className="text-4xl font-bold">水晶男孩 ERP 系統</span>
              </h1>
            </div>
            <Separator orientation="vertical" />
            <LoginForm />
          </CardContent>
          <Footer />
        </Card>
      </div>
    </div>
  );
}
