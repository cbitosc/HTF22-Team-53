import React from 'react'

function Alumni() {
  return (
    <>
    <nav className="navbar bg-light">
  <div className="container-fluid">
    <a className="navbar-brand">Alumni Dashboard</a>
    <form className="d-flex" role="search">
      <a
        className="navbar-brand me-200" href="/connect"
      > Discuss </a>
    
      <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                me-10
            >
                Profile
            </button>
            <ul className="dropdown-menu">
                <li>
                <a className="dropdown-item" href="/blog">
                    Blog
                </a>
                </li>
                <li>
                <a className="dropdown-item" href="/logout">
                    Logout
                </a>
                </li>
            </ul>
        </div>
    </form>
    

  </div>
</nav>

    </>
  )
}

export default Alumni