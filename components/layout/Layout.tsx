import Body from "../body/Body"
import Footer from "../footer/Footer"
import Header from "../header/Header"

export default function Layout() {
    return (
        <section className="section box">
            <Header />
            <Body />
            <Footer />
        </section>
    )
}