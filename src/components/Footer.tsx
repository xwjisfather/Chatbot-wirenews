import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative flex flex-col w-full min-h-[1200px] max-lg:min-h-[1000px] max-md:min-h-[800px] max-sm:min-h-[700px] px-8 max-lg:px-6 max-md:px-4 max-sm:px-3 pt-52 max-lg:pt-40 max-md:pt-32 max-sm:pt-24 pb-0 mt-96 max-lg:mt-72 max-md:mt-48 max-sm:mt-32">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c26ea3463d22b20b405f75f19dc6a78780219df7acb199b550a95e8a8b0d067e?placeholderIfAbsent=true&apiKey=63de7e29674842c29a93babaf5f1d67a"
        className="object-cover absolute inset-0 size-full"
        alt=""
      />

      <div className="relative flex flex-wrap justify-between w-full max-w-[1200px] max-lg:max-w-[900px] max-md:max-w-[700px] max-sm:max-w-[95%] mx-auto gap-10 max-md:gap-8 max-sm:gap-6">
        {/* Logo Section */}
        <div className="w-[220px] max-sm:w-full">
          <div className="flex gap-2 items-center text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-bold text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ff7df817da23b9beeb02c4900e83fdb4f70964c922e5397ff0717fe28376a29?placeholderIfAbsent=true&apiKey=63de7e29674842c29a93babaf5f1d67a"
              className="object-contain shrink-0 aspect-[1.5] w-[87px] max-lg:w-[75px] max-md:w-[65px] max-sm:w-[55px]"
              alt="智富匯 logo"
            />
            <div data-layername="智富匯">智富匯</div>
          </div>
          <div className="mt-3 text-xs max-sm:text-[10px] text-white text-opacity-60">
            <span className="font-medium capitalize">Empower </span>
            <span className="font-medium capitalize">AI</span>{" "}
            <span className="font-medium capitalize">technology</span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex gap-10 max-md:gap-8 max-sm:gap-6 text-sm max-sm:text-xs text-white w-[259px] min-w-[240px] max-sm:w-full max-sm:min-w-0">
          <div className="flex flex-col flex-1">
            <h3 className="font-bold">公司</h3>
            <ul className="flex flex-col mt-6 max-sm:mt-4 space-y-3 max-sm:space-y-2">
              <li><a href="#about">關於我們</a></li>
              <li><a href="#services">我們的服務</a></li>
              <li><a href="#community">社區</a></li>
            </ul>
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="font-bold">公司</h3>
            <ul className="flex flex-col mt-6 max-sm:mt-4 space-y-3 max-sm:space-y-2">
              <li><a href="#community">社區</a></li>
              <li><a href="#certificates">證書</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </nav>

        {/* Join Section */}
        <div className="w-[454px] min-w-[240px] max-md:w-full">
          <div className="flex flex-col min-h-[155px] max-md:min-h-[130px] max-sm:min-h-[110px]">
            <h3
              className="py-0.5 text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg font-semibold w-[347px] max-md:w-full font-noto-sans bg-gradient-to-b from-white/90 via-white/70 to-white/40 bg-clip-text text-transparent"
              >
            加入<br />智富匯
          </h3>
            <form className="flex gap-10 max-md:gap-6 max-sm:gap-4 mt-6 max-sm:mt-4 pl-5 text-lg max-md:text-base max-sm:text-sm font-medium text-white border border-solid border-slate-500 rounded-[99px]">
              <input
                type="email"
                placeholder="郵箱"
                className="flex-1 py-2.5 bg-transparent basis-[120px]"
              />
              <button type="submit" className="relative flex gap-2.5 px-16 max-md:px-12 max-sm:px-8 py-4 max-sm:py-3 rounded-[54px]">
                <span className="z-0 my-auto">發送</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad5dfa9cb3d48fbe9764940070d7d8e5b17639b1985311e837e18cd3efe62ff0?placeholderIfAbsent=true&apiKey=63de7e29674842c29a93babaf5f1d67a"
                  className="absolute bottom-0 left-2/4 -translate-x-2/4 w-[164px] max-md:w-[140px] max-sm:w-[120px] h-[50px] max-md:h-[45px] max-sm:h-[40px] object-contain aspect-[3.28]"
                  alt=""
                />
              </button>
            </form>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-10 max-md:mt-8 max-sm:mt-6">
            {['Facebook', 'Twitter', 'Instagram'].map((social, index) => (
              <a key={index} href="#" aria-label={social}>
                <img
                  loading="lazy"
                  src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${
                    index === 0 ? 'b28c22936ece1ca805d91dfeb569c6a2e7956573fd65caccc6c32096aa21beee' :
                    index === 1 ? '340edbe4ba43e7364984eaa8378562b276f34f38c441b6b9d766a0feb8e97359' :
                    '35329f5692ccb605a815eb58c3c04dc9e9cdc58dd251c0163cb7f010140d7279'
                  }?placeholderIfAbsent=true&apiKey=63de7e29674842c29a93babaf5f1d67a`}
                  className="w-8 max-md:w-7 max-sm:w-6 aspect-square object-contain"
                  alt={`${social} icon`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;