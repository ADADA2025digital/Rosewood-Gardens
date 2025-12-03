import { Helmet } from "react-helmet-async";
import { seoData } from "../Constants/Data";

const SeoHead = (props) => {
  const seo = {
    ...seoData,
    ...props,
  };

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{seo.title}</title>
      <meta
        name="description"
        content="Rosewood Gardens provides trusted Aged & Disability Care, NDIS support, and Government-funded home services across Sydney & Melbourne."
      />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="Rosewood Gardens" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.rosewoodgardens.com.au" />

      {/* Open Graph */}
      <meta
        property="og:title"
        content="Rosewood Gardens | Compassionate Aged & Disability Care in Sydney & Melbourne"
      />
      <meta
        property="og:description"
        content="Rosewood Gardens is a trusted leader in Aged & Disability Care, NDIS Support Services, and the Government-funded Support at Home program, proudly serving communities across Sydney and Melbourne."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.rosewoodgardens.com.au" />
      <meta
        property="og:image"
        content="https://www.rosewoodgardens.com.au/assets/image1-BSFppmib.png"
      />

      {/* Facebook  */}
      <meta property="fb:app_id" content="#" />
      <meta
        property="fb:admins"
        content="https://www.facebook.com/rosewoodgardensac"
      />

      {/* Instagram */}
      <meta
        name="instagram:title"
        content="Rosewood Gardens | Compassionate Aged & Disability Care in Sydney & Melbourne"
      />
      <meta
        name="instagram:description"
        content="Rosewood Gardens is a trusted leader in Aged & Disability Care, NDIS Support Services, and the Government-funded Support at Home program, proudly serving communities across Sydney and Melbourne."
      />
      <meta
        name="instagram:image"
        content="https://www.rosewoodgardens.com.au/assets/image1-BSFppmib.png"
      />
      <meta name="instagram:site" content="@rosewoodgardensau" />
    </Helmet>
  );
};

export default SeoHead;
