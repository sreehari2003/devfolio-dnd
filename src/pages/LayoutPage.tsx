import "./layout.css";

export const LayoutPage = () => {
  return (
    <main className="layout">
      <article className="layout-content">
        <span className="hollow-red-rectangle"> </span>
        <span className="hollow-blue-rectangle"> </span>
        <div className="main-section">
          <span className="filled-pink-rectangle"> </span>
          <span className="filled-blue-rectangle"> </span>
          <span className="hollow-pink-rectangle"> </span>
          <p className="title-number">30</p>
          <div className="title">
            <p>HOURS</p>
            <p className="sub-title">
              OF <span>...</span>
            </p>
            <span className="blurred-circle"> </span>
          </div>
        </div>
        <div className="footer">
          <p>DESIGNING / BUILDING / CODING / HACKING</p>
          <p className="sub-footer">
            NETWORKING / FRIENDS / MENTORS / COMPETITIONS
          </p>
          <p className="sub-sub-footer">
            COFEE / TEA / GREEN TEA / FOOD / SNACKS / SWAGS / T-SHIRTS
          </p>
          <p className="third-layer_footer">
            SUPER FAST INTERNET / TALKS / DID WE MENTION GREEN TEA? / PRIZES /
            BRAND NEW APIs
          </p>
          <div className="last_footer">
            <p className="last_footer_text">AND / A / WHOLE / LOT / MORE</p>
            <span></span>
          </div>
        </div>
      </article>
    </main>
  );
};
