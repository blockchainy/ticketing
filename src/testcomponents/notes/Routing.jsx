// React router

// exact path
// will only match /roster and not /roster/2
<Route exact path='/roster'/>

// url —the matched part of the current location’s pathname
// path — the route’s path
// isExact —path === pathname
// params — an object containing values from the pathname that were captured by path-to-regexp

// / — the homepage
// /roster — the team’s roster
// /roster/:number — a profile for a player, using the player’s number
// /schedule — the team’s schedule of games


<Switch>
  <Route exact path='/' component={Home}/>
  {/* both /roster and /roster/:number begin with /roster */}
  <Route path='/roster' component={Roster}/>
  <Route path='/schedule' component={Schedule}/>
</Switch>