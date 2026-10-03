"use client";

import { Building2 } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-base-100 shadow-md py-3 px-6 sticky top-0 z-20 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Building2 className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold text-base-content tracking-tight">関西圏新築分譲マンションマップ</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm opacity-70">管理者ログイン中</span>
        <button className="btn btn-sm btn-outline">ログアウト</button>
      </div>
    </header>
  );
}
