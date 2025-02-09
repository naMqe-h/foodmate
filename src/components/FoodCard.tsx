"use client"

import { IRecipe } from '@/utils/interfaces';
import Image from 'next/image';
import Link from 'next/link';


export default function FoodCard({ id, image, title, summary = "", readyInMinutes, analyzedInstructions }: IRecipe) {
    let difficulty: "Easy" | "Medium" | "Hard" = "Easy";

    if(analyzedInstructions && analyzedInstructions[0].steps) {
        if(analyzedInstructions[0].steps.length > 5) difficulty = "Medium";
        if(analyzedInstructions[0].steps.length > 15) difficulty = "Hard";
    }


    return (
        <Link href={`/recipes/${id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-[380px]">
                <div className="relative h-[192px] w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-4 flex flex-col justify-between h-[188px]">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                        <p 
                        className="text-gray-600 text-sm mb-3 line-clamp-2" 
                        dangerouslySetInnerHTML={{ __html: summary.substring(0, 100) + '...' }} 
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium">
                        <span className="flex items-center text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {readyInMinutes} minutes
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                            difficulty === "Easy" ? "bg-green-100 text-green-800" :
                            difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                        }`}>
                            {difficulty}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
  );
}
