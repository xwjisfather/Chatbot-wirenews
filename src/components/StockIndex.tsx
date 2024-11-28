import React from "react";

interface StockData {
  name: string;
  change: string;
  value: string;
  isPositive: boolean;
}

const StockIndex: React.FC = () => {
  const stockData: StockData[] = [
    { name: "DIA", change: "+0.42%", value: "419.8264", isPositive: true },
    { name: "NDX", change: "-5.3%", value: "16481.492", isPositive: false },
  ];

  return (
    <section id="stock" className="mt-56 max-lg:mt-40 max-md:mt-32 max-sm:mt-20 w-full max-w-[992px] max-lg:max-w-[800px] max-md:max-w-[600px] max-sm:max-w-[95%] mx-auto">
      <h2
        data-layername="股票指數"
        className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-medium text-center text-white whitespace-nowrap"
      >
        股票指數
      </h2>
      {/* 添加紫色背景容器 */}
      <div className="mt-20 max-lg:mt-16 max-md:mt-12 max-sm:mt-8 bg-[#2D1B69]/30 backdrop-blur-sm rounded-3xl p-8 max-lg:p-6 max-md:p-4">
        <div className="flex flex-wrap justify-center items-center w-full text-center">
          {stockData.map((stock, index) => (
            <div
              key={stock.name}
              className={`flex flex-wrap grow shrink gap-7 max-md:gap-5 max-sm:gap-3 self-stretch px-6 max-md:px-4 max-sm:px-3 py-4 my-auto whitespace-nowrap min-h-[216px] max-lg:min-h-[180px] max-md:min-h-[150px] max-sm:min-h-[120px] min-w-[240px] w-[400px] max-lg:w-[350px] max-md:w-[300px] max-sm:w-full ${
                index === 0 ? "border-r border-white/20 max-sm:border-r-0 max-sm:border-b max-sm:pb-6 max-sm:mb-6" : ""
              }`}
            >
              <div
                data-layername={stock.name}
                className="my-auto text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-5xl font-medium text-white w-[252px] max-lg:w-[220px] max-md:w-[180px] max-sm:w-[150px]"
              >
                {stock.name}
              </div>
              <div className="flex flex-col flex-1 shrink justify-center items-start basis-0">
                <div
                  data-layername={stock.change}
                  className={`text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-medium leading-none ${
                    stock.isPositive ? "text-green-500" : "text-red-600"
                  }`}
                >
                  {stock.change}
                </div>
                <div
                  data-layername={stock.value}
                  className="mt-5 max-md:mt-4 max-sm:mt-3 text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base text-white"
                >
                  {stock.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StockIndex;