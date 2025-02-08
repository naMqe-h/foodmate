import { IRecipe } from "@/utils/interfaces";

export default function Instructions({ recipe }: { recipe: IRecipe }) {
    return (
        <div className="mb-8">
            {recipe.analyzedInstructions.map((instruction, index) => (
                <details key={index} className="mb-4 border-b border-gray-200 pb-4">
                    <summary className="cursor-pointer hover:text-gray-700 transition-colors text-xl font-semibold mb-3">
                        {instruction.name || `Instructions`}
                    </summary>

                    <div className="mt-4 pl-4">
                        {instruction.steps.map((step) => (
                            <div key={step.number} className="mb-4">
                                <p className="font-medium">Step {step.number}</p>
                                <p className="text-gray-700">{step.step}</p>
                            </div>
                        ))}
                    </div>
                </details>
            ))}
        </div>
    )
}
