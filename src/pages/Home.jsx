import { Link } from "react-router-dom";

import products from "../data/products";

import ProductCard from "../components/common/ProductCard";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";

function Home() {
  return (
    <main className="home">

      {/* =========================
          HERO
      ========================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-eyebrow">
            NEXUS ESPORTS APPAREL
          </p>

          <h1>
            WEAR YOUR
            <span> GAMING IDENTITY.</span>
          </h1>

          <p className="hero-description">
            Create a jersey that represents the way you play.
            Discover your style, customize your design and make
            it yours.
          </p>

          <div className="hero-actions">

            <Button to="/design">
              DESIGN YOUR JERSEY
            </Button>

            <Button
              to="/shop"
              variant="secondary"
            >
              EXPLORE COLLECTION
            </Button>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-visual-glow"></div>

          <div className="hero-jersey-placeholder">
            <span>NEXUS</span>
          </div>

        </div>

      </section>


      {/* =========================
          IDENTITY ENGINE
      ========================= */}

      <section className="identity-section">

        <div className="identity-content">

          <SectionHeading
            eyebrow="THE NEXUS IDENTITY ENGINE"
            title="YOUR PLAYSTYLE. YOUR JERSEY."
            description="Tell us how you play. Nexus transforms your player identity into a design direction built around your style."
          />

          <Button to="/identity">
            FIND MY IDENTITY
          </Button>

        </div>

        <div className="identity-visual">

          <div className="identity-card">
            <span>01</span>
            <strong>DISCOVER</strong>
            <p>Your player style</p>
          </div>

          <div className="identity-card">
            <span>02</span>
            <strong>DEFINE</strong>
            <p>Your visual identity</p>
          </div>

          <div className="identity-card">
            <span>03</span>
            <strong>DESIGN</strong>
            <p>Your jersey</p>
          </div>

        </div>

      </section>


      {/* =========================
          FEATURED PRODUCTS
      ========================= */}

      <section className="featured-section">

        <SectionHeading
          eyebrow="NEXUS COLLECTION"
          title="BUILT FOR YOUR GAME."
          description="Explore designs created around different player identities."
        />

        <div className="product-grid">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

        <div className="section-action">
          <Button
            to="/shop"
            variant="secondary"
          >
            VIEW ALL PRODUCTS
          </Button>
        </div>

      </section>


      {/* =========================
          COMMUNITY
      ========================= */}

      <section className="community-section">

        <SectionHeading
          align="center"
          eyebrow="NEXUS COMMUNITY"
          title="DESIGNED BY PLAYERS."
          description="Explore the identity and creativity of the Nexus community."
        />

        <div className="community-grid">

          <div className="community-card community-card-large">
            <span>01</span>
            <strong>COMPETE</strong>
          </div>

          <div className="community-card">
            <span>02</span>
            <strong>CREATE</strong>
          </div>

          <div className="community-card">
            <span>03</span>
            <strong>REPRESENT</strong>
          </div>

        </div>

        <div className="section-action">
          <Button
            to="/gallery"
            variant="secondary"
          >
            EXPLORE GALLERY
          </Button>
        </div>

      </section>


      {/* =========================
          LIMITED DROP
      ========================= */}

      <section className="drop-section">

        <div className="drop-content">

          <p className="section-eyebrow">
            NEXUS / LIMITED DROP
          </p>

          <h2>
            BUILT FOR
            <span> THE NEXT GAME.</span>
          </h2>

          <p>
            Limited designs. Small releases.
            When the drop is gone, it's gone.
          </p>

          <Button to="/drops">
            EXPLORE THE DROP
          </Button>

        </div>

        <div className="drop-visual">
          <span>NX</span>
        </div>

      </section>


      {/* =========================
          TEAM CTA
      ========================= */}

      <section className="team-section">

        <div>

          <p className="section-eyebrow">
            FOR ESPORTS TEAMS
          </p>

          <h2>
            ONE TEAM.
            <span>ONE IDENTITY.</span>
          </h2>

          <p>
            Build coordinated jerseys for your entire
            team while keeping every player's identity intact.
          </p>

        </div>

        <Button to="/teams">
          BUILD YOUR TEAM
        </Button>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="final-cta">

        <p className="section-eyebrow">
          YOUR IDENTITY STARTS HERE
        </p>

        <h2>
          DON'T JUST
          <span>WEAR A JERSEY.</span>
        </h2>

        <p>
          Create something that represents how you play.
        </p>

        <Button to="/design">
          START DESIGNING
        </Button>

      </section>

    </main>
  );
}

export default Home;