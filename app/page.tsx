import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Users, Trophy, History } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Pickleball ELO</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="text-2xl">Track Your Pickleball Progress</CardTitle>
              <CardDescription>
                Record matches, track your ELO rating, and see your improvement over time.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Personal Ratings</h3>
                <p className="text-sm text-muted-foreground">Track separate ELO ratings for singles and doubles play</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Match Recording</h3>
                <p className="text-sm text-muted-foreground">Easily log matches and automatically update ratings</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Progress History</h3>
                <p className="text-sm text-muted-foreground">View your rating history and match results over time</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top players based on ELO rating</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="singles">
                <TabsList className="mb-4">
                  <TabsTrigger value="singles">Singles</TabsTrigger>
                  <TabsTrigger value="doubles">Doubles</TabsTrigger>
                </TabsList>
                <TabsContent value="singles">
                  <div className="space-y-2">
                    {[
                      { name: "Alex Johnson", rating: 1850 },
                      { name: "Sarah Williams", rating: 1820 },
                      { name: "Michael Chen", rating: 1795 },
                      { name: "Jessica Taylor", rating: 1780 },
                      { name: "David Rodriguez", rating: 1765 },
                    ].map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                            {index + 1}
                          </div>
                          <span>{player.name}</span>
                        </div>
                        <span className="font-medium">{player.rating}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="doubles">
                  <div className="space-y-2">
                    {[
                      { name: "Emma Davis", rating: 1920 },
                      { name: "James Wilson", rating: 1905 },
                      { name: "Olivia Martinez", rating: 1890 },
                      { name: "Noah Thompson", rating: 1875 },
                      { name: "Sophia Anderson", rating: 1860 },
                    ].map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                            {index + 1}
                          </div>
                          <span>{player.name}</span>
                        </div>
                        <span className="font-medium">{player.rating}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
              <CardDescription>Latest recorded games</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Singles", player1: "Alex Johnson", player2: "Sarah Williams", score: "11-8, 11-9" },
                  { type: "Doubles", player1: "Emma & James", player2: "Olivia & Noah", score: "11-7, 9-11, 11-8" },
                  { type: "Singles", player1: "Michael Chen", player2: "David Rodriguez", score: "11-5, 11-7" },
                ].map((match, index) => (
                  <div key={index} className="rounded-md border p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {match.type}
                      </span>
                      <span className="text-xs text-muted-foreground">Today</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{match.player1}</span>
                      <span className="text-sm">vs</span>
                      <span className="font-medium">{match.player2}</span>
                    </div>
                    <div className="text-sm text-center mt-1 text-muted-foreground">{match.score}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pickleball ELO Tracker
        </div>
      </footer>
    </div>
  )
}

