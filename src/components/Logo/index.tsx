function Logo({
  centered = true,
  width = 320,
  height = 48,
}: {
  centered?: boolean;
  width?: number;
  height?: number;
}) {
  let props: {
    x: number | string;
    y: number | string;
    dominantBaseline?: string;
    textAnchor?: string;
  } = {
    x: 0,
    y: 40,
  };

  if (centered) {
    props = {
      x: "50%",
      y: "50%",
      dominantBaseline: "middle",
      textAnchor: "middle",
    };
  }

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      <svg
        version="1.1"
        fill="currentColor"
        viewBox="0 0 320 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          {...props}
          style={{
            fontFamily: "Bon Voyage",
            fontSize: "48px",
            strokeWidth: 0.26458,
          }}
        >
          Keyla
        </text>
      </svg>
    </div>
  );
}

export default Logo;
