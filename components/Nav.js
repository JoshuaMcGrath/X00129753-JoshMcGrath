

import Link from 'next/link';

const Nav = () => (
   <div>
       <nav>
           <ul>
            <li><Link href="/index"><a>Home</a></Link></li>
            <li><Link href="/news"><a>News</a></Link></li>
            <li><Link href="/business"><a>Business</a></Link></li>
            <li><Link href="/sport"><a>Sport</a></Link></li>
            <li><Link href="/weather"><a>Weather</a></Link></li>
           </ul>
       </nav>
       {/* Define css for this page or component */}
       {/* Note back ticks `` surrounding css are required */}
       <style jsx>{`
        nav {
            max-width:1485px;
            background: rgb(240, 248, 255);
            border: 1px solid #ccc;
            border-right: none;
            margin-left:36px;
            margin-right:36px;
        }


        nav ul {
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            list-style: none;
            float: left;
            flex-grow: 1;
            text-align: center;
            border-left: 1px solid #fff;
            border-right: 1px solid #ccc;

        }

        nav ul li:first-child {
            border-left: none;
        }

        nav ul li a {
            font-size: 0.8em;
            display: block;
            text-decoration: none;
            color: black;
            padding: 5px 0;
        }

        nav ul li:hover {
            background: rgb(240, 248, 255);
        }
        nav ul li a:hover {
            color: black;
        }

        `}</style>
   </div> 
)

export default Nav;

