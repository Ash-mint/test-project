import HeroSection from "../components/Sections/HeroSection";
import Masonry from "../components/Sections/Masonry";

function Home() {
  return (
    <>
      <HeroSection
        img={
          "https://rsvpify.com/wp-content/uploads/2025/01/holidayparty_mobile_asset-1_11zon.webp"
        }
        title={"Create any event in minutes."}
        paragraph1={"Automate event management,"}
        paragraph2={"from invite to check-in."}
        linkName={"Get started for free"}
        linkPath={"/login"}
      />
      <Masonry />
      <HeroSection
        img={
          "https://www.eventbookings.com/wp-content/uploads/2023/02/zero-cost-1.png"
        }
        title={"Zero cost for free events"}
        paragraph1={"Hosting a free event?"}
        paragraph2={"You won’t pay a cent. Ever."}
        linkName={"Create Event"}
        linkPath={"/login"}
      />
    </>
  );
}

export default Home;
