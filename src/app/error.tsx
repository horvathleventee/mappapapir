"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container empty-state error-page">
      <h1>Valami félbeszakadt.</h1>
      <p>Az oldal betöltése most nem sikerült. Próbáld újra.</p>
      <button className="button primary" onClick={reset}>
        Újrapróbálom
      </button>
    </div>
  );
}
