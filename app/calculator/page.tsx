import Wizard from '@/components/calculator/Wizard';

export default function CalculatorPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-4">Calculate Your Footprint</h1>
          <p className="text-muted-foreground">Find out your impact and get a personalized path to reduction.</p>
        </div>
        <Wizard />
      </div>
    </div>
  );
}
