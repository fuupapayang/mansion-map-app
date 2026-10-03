"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Map = dynamic(() => import("@/components/MapComponent"), { ssr: false });

type Mansion = {
  物件名: string;
  販売価格: string;
  所在地: string;
  交通アクセス: string;
  lat: number;
  lng: number;
};

export default function Home() {
  const [mansions, setMansions] = useState<Mansion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/mansions.json")
      .then(res => res.json())
      .then(data => setMansions(data))
      .catch(err => console.error(err));
  }, []);

  const filteredMansions = mansions.filter(m => 
    m.物件名.includes(searchTerm) || m.所在地.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-screen bg-base-200" data-theme="light">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          resultCount={filteredMansions.length}
        />
        <main className="flex-1 relative">
          <Map mansions={filteredMansions} />
        </main>
      </div>
    </div>
  );
}
