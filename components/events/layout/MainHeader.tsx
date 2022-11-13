import Link from "next/link";

function MainHeader() {
  return (
    <header
      style={{
        minHeight: "50px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "slateblue",
        padding: "10px",
        fontWeight: "bold",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link href='/'>NextEvents</Link>
      </div>
      <nav style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <span>
          <Link href='/events'>ALL EVENTS</Link>
        </span>
        <Link href='/'>FEATURED EVENTS</Link>
        <span>ITEM 3</span>
      </nav>
    </header>
  );
}

export default MainHeader;
