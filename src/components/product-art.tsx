import type { ArtKind } from "@/lib/models";

// Original scalable product illustrations. No third-party product photography.
export function ProductArt({
  kind,
  color = "#758573",
  label,
  className = "",
}: {
  kind: ArtKind;
  color?: string;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 260"
      className={`product-art ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <ellipse
        cx="162"
        cy="221"
        rx="90"
        ry="12"
        fill="#202b36"
        opacity=".065"
      />
      {kind === "notebook" && (
        <g transform="rotate(-12 160 135)">
          <rect
            x="87"
            y="42"
            width="148"
            height="180"
            rx="7"
            fill="#25352d"
            opacity=".18"
          />
          <rect x="81" y="33" width="148" height="183" rx="6" fill={color} />
          <path d="M89 37v174" stroke="#fff" opacity=".2" strokeWidth="2" />
          <path d="M91 211h132" stroke="#f4eddd" strokeWidth="5" />
          <rect
            x="207"
            y="33"
            width="6"
            height="180"
            fill="#182d2c"
            opacity=".35"
          />
          <rect
            x="111"
            y="82"
            width="84"
            height="57"
            fill="#f3ead9"
            opacity=".95"
          />
          <text
            x="153"
            y="105"
            textAnchor="middle"
            fontSize="8"
            letterSpacing="3"
            fill="#4f5b50"
          >
            NOTES
          </text>
          <path d="M135 118h36m-27 5h18" stroke="#9b9d88" />
          <path d="m179 215 0 17 7-5 7 5v-17" fill="#b9855f" />
        </g>
      )}
      {kind === "pen" && (
        <g transform="rotate(33 160 130)">
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${i * 42 - 20} ${i * -14})`}>
              <rect
                x="145"
                y="51"
                width="17"
                height="151"
                rx="8"
                fill={i ? "#283e47" : color}
              />
              <rect x="145" y="68" width="17" height="3" fill="#d6bf8c" />
              <path d="m145 193 8.5 27 8.5-27" fill="#c9b784" />
              <path d="m151 212 2.5 8 2.5-8" fill="#313941" />
              <path
                d="M157 48v49"
                stroke="#d6bf8c"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M149 78v103"
                stroke="#fff"
                opacity=".2"
                strokeWidth="2"
              />
            </g>
          ))}
        </g>
      )}
      {kind === "pencils" && (
        <g transform="rotate(-12 160 140)">
          {[
            "#b06c59",
            "#c59451",
            "#d2b672",
            "#7d937b",
            "#6a8793",
            "#7e708b",
          ].map((c, i) => (
            <g
              key={c}
              transform={`translate(${i * 22} ${[10, 0, 17, 5, 14, 2][i]})`}
            >
              <path d="M91 71l8-30 8 30" fill="#dfc5a0" />
              <path d="m96 51 3-10 3 10" fill={c} />
              <rect x="91" y="71" width="16" height="132" rx="2" fill={c} />
              <path
                d="M95 73v126"
                stroke="#fff"
                opacity=".25"
                strokeWidth="3"
              />
            </g>
          ))}
        </g>
      )}
      {kind === "paper" && (
        <g transform="rotate(-9 160 130)">
          <path d="M77 69h157v148H77z" fill="#d8d2c6" />
          <path d="M73 60h157v150H73z" fill="#fefdf8" stroke="#dedbd3" />
          <path d="M70 49h157v151H70z" fill="#fffdf7" stroke="#dedbd3" />
          <path d="M70 91h157v76H70z" fill={color} />
          <text
            x="148"
            y="128"
            textAnchor="middle"
            fill="white"
            fontSize="22"
            letterSpacing="5"
          >
            PAPIER
          </text>
          <text
            x="148"
            y="148"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            letterSpacing="3"
          >
            POUR LES IDÉES
          </text>
          <path d="M90 185h118" stroke="#d6d2c7" />
        </g>
      )}
      {kind === "folder" && (
        <g transform="rotate(-10 160 140)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 47} ${-i * 6})`}>
              <rect x="82" y="48" width="43" height="170" rx="3" fill={color} />
              <rect
                x="87"
                y="52"
                width="3"
                height="162"
                fill="#fff"
                opacity={0.1 + i * 0.09}
              />
              <rect
                x="93"
                y="78"
                width="22"
                height="65"
                rx="1"
                fill="#f4f0e5"
              />
              <path d="M97 90h14m-14 7h14m-14 7h10" stroke="#b6b6aa" />
              <circle cx="104" cy="184" r="10" fill="#cec5b3" />
              <circle cx="104" cy="184" r="7" fill="#263b3d" />
            </g>
          ))}
        </g>
      )}
      {kind === "clips" && (
        <g stroke={color} strokeWidth="7" fill="none" strokeLinecap="round">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              transform={`translate(${(i % 3) * 53} ${Math.floor(i / 3) * 68}) rotate(${i * 15 - 30} 110 103)`}
              d="M94 118V78a14 14 0 0 1 28 0v45a21 21 0 0 1-42 0V79a7 7 0 0 1 14 0v35"
            />
          ))}
        </g>
      )}
      {kind === "ruler" && (
        <g transform="rotate(-27 160 130)">
          <rect x="44" y="100" width="235" height="51" rx="3" fill={color} />
          <rect
            x="49"
            y="104"
            width="224"
            height="42"
            fill="#f5dfb7"
            opacity=".35"
          />
          {Array.from({ length: 29 }, (_, i) => (
            <path
              key={i}
              d={`M${52 + i * 7.6} 105v${i % 5 === 0 ? 20 : 10}`}
              stroke="#695b44"
              strokeWidth="1"
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <text key={i} x={52 + i * 38} y="140" fontSize="9" fill="#554f42">
              {i * 5}
            </text>
          ))}
        </g>
      )}
      {kind === "bag" && (
        <g transform="rotate(-12 160 130)">
          <rect x="57" y="84" width="214" height="111" rx="25" fill={color} />
          <path
            d="M69 101h189"
            stroke="#f5e6ca"
            strokeWidth="5"
            strokeDasharray="2 2"
          />
          <path d="M65 109h194" stroke="#4a3a2b" opacity=".4" />
          <rect x="253" y="93" width="13" height="21" rx="3" fill="#bbaa87" />
          <rect x="124" y="130" width="76" height="36" fill="#f4eedc" />
          <text
            x="162"
            y="151"
            fontSize="9"
            textAnchor="middle"
            letterSpacing="3"
            fill="#685744"
          >
            STUDIO
          </text>
          <path
            d="M70 178q90 18 185 0"
            fill="none"
            stroke="#fff"
            strokeDasharray="3 4"
            opacity=".3"
          />
        </g>
      )}
      {kind === "paint" && (
        <g transform="rotate(-10 160 130)">
          <rect
            x="55"
            y="64"
            width="211"
            height="139"
            rx="12"
            fill="#e9e4d8"
            stroke="#c8c5b9"
          />
          <rect x="64" y="72" width="193" height="122" rx="8" fill="#f9f6ef" />
          {[
            "#b56854",
            "#d3a453",
            "#e2cc89",
            "#889367",
            "#5b8270",
            "#4c6f84",
            "#a97580",
            "#b99476",
            "#7486a3",
            "#8c7a92",
            "#535952",
            "#b4aba0",
          ].map((c, i) => (
            <g key={c}>
              <rect
                x={75 + (i % 6) * 29}
                y={85 + Math.floor(i / 6) * 43}
                width="23"
                height="33"
                rx="4"
                fill="#ded7c9"
              />
              <rect
                x={78 + (i % 6) * 29}
                y={88 + Math.floor(i / 6) * 43}
                width="17"
                height="26"
                rx="3"
                fill={c}
              />
            </g>
          ))}
          <path
            d="M78 179h169"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      )}
      {kind === "tape" && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 48 - 35} ${(i % 2) * 30})`}>
              <ellipse cx="144" cy="128" rx="43" ry="34" fill={color} />
              <path d="M101 128v37c0 45 86 45 86 0v-37" fill={color} />
              <ellipse cx="144" cy="128" rx="43" ry="32" fill="#e6d6b6" />
              <ellipse cx="144" cy="128" rx="27" ry="21" fill="#a9967e" />
              <ellipse cx="144" cy="132" rx="25" ry="18" fill="#f4f0e6" />
              <path
                d="M108 158v17m12-9v17m13-12v17m13-11v15m14-16v13m12-19v13"
                stroke="#fff"
                strokeWidth="4"
                opacity=".3"
              />
            </g>
          ))}
        </g>
      )}
      {kind === "scissors" && (
        <g transform="rotate(-20 160 130)">
          <path
            d="m147 153-9-111 26 96 28-90-9 111"
            fill="#a8b0af"
            stroke="#748183"
            strokeWidth="2"
          />
          <circle cx="161" cy="142" r="6" fill="#667779" />
          <ellipse
            cx="139"
            cy="182"
            rx="24"
            ry="35"
            fill="none"
            stroke={color}
            strokeWidth="14"
          />
          <ellipse
            cx="193"
            cy="182"
            rx="24"
            ry="35"
            fill="none"
            stroke={color}
            strokeWidth="14"
          />
        </g>
      )}
      {kind === "organizer" && (
        <g>
          <path
            d="m116 130-8-88m43 89 13-99m15 105 30-86"
            stroke="#bc975f"
            strokeWidth="10"
          />
          <path
            d="m128 135 3-99m39 99 19-98"
            stroke="#526a70"
            strokeWidth="9"
          />
          <ellipse cx="159" cy="123" rx="60" ry="21" fill="#485b56" />
          <path
            d="M99 123v73c0 35 120 35 120 0v-73c-5 26-115 26-120 0"
            fill={color}
          />
          <path
            d="M111 139v58m12-54v60m13-57v61m14-59v61m14-61v61m14-64v61m14-64v60m14-64v57"
            stroke="#fff"
            opacity=".12"
            strokeWidth="2"
          />
        </g>
      )}
    </svg>
  );
}

export function HeroStillLife() {
  return (
    <div
      className="still-life"
      role="img"
      aria-label="Saját illusztráció: zsályazöld notesz, színes ceruzák és terrakotta írószerek egy világos munkaasztalon"
    >
      <div className="still-circle" />
      <div className="still-grid" />
      <div className="still-paper">
        <span>
          MAKE ROOM
          <br />
          FOR IDEAS.
        </span>
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="still-notebook">
        <ProductArt kind="notebook" color="#687a68" />
      </div>
      <div className="still-pencils">
        <ProductArt kind="pencils" />
      </div>
      <div className="still-pen">
        <ProductArt kind="pen" color="#b47753" />
      </div>
      <div className="still-tape">
        <ProductArt kind="tape" color="#c29873" />
      </div>
      <span className="still-caption">A KÖVETKEZŐ JÓ ÖTLETEDHEZ.</span>
      <span className="art-note">Saját demóillusztráció</span>
    </div>
  );
}
