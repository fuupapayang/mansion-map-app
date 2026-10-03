"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type SidebarProps = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  resultCount: number;
};

export default function Sidebar({ searchTerm, setSearchTerm, resultCount }: SidebarProps) {
  return (
    <div className="w-[350px] bg-base-100 shadow-lg h-full overflow-y-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">検索条件</h2>
        <button className="btn btn-ghost btn-xs text-info" onClick={() => setSearchTerm("")}>クリア</button>
      </div>

      <div className="bg-base-200 p-4 rounded-lg space-y-3">
        <h3 className="font-bold text-sm border-b border-base-300 pb-2">物件名で検索</h3>
        <input 
          type="text" 
          placeholder="例: ザ・タワー" 
          className="input input-sm input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-base-200 p-4 rounded-lg space-y-3">
        <h3 className="font-bold text-sm border-b border-base-300 pb-2">エリア・沿線</h3>
        <select className="select select-sm select-bordered w-full">
          <option>すべてのエリア</option>
          <option>大阪府</option>
          <option>京都府</option>
          <option>兵庫県</option>
        </select>
        <button className="btn btn-sm btn-outline w-full" disabled>市区町村で絞り込む</button>
      </div>

      <div className="bg-base-200 p-4 rounded-lg space-y-3 opacity-50">
        <h3 className="font-bold text-sm border-b border-base-300 pb-2">価格帯 (Pro版機能)</h3>
        <div className="px-2 pt-2">
          <Slider range min={2600} max={100000} defaultValue={[2600, 100000]} disabled />
        </div>
        <div className="flex justify-between text-xs opacity-70">
          <span>2,600万円</span>
          <span>10億円</span>
        </div>
      </div>

      <div className="mt-auto text-sm opacity-70 text-center border-t pt-4">
        表示物件数: {resultCount}件
      </div>
    </div>
  );
}
