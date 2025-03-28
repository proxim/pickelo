"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, History, Users, UserCircle, LogOut, Plus } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for the rating history chart
const ratingData = [
  { date: "Jan", singles: 1500, doubles: 1550 },
  { date: "Feb", singles: 1520, doubles: 1570 },
  { date: "Mar", singles: 1510, doubles: 1590 },
  { date: "Apr", singles: 1540, doubles: 1600 },
  { date: "May", singles: 1560, doubles: 1620 },
  { date: "Jun", singles: 1580, doubles: 1610 },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Pickleball ELO</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/record-match">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Record Match
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">John Smith</span>
            </div>
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-4 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr] py-4">
        <aside className="hidden md:block">
          <nav className="grid gap-2 text-sm">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <UserCircle className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "matches" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("matches")}
            >
              <History className="mr-2 h-4 w-4" />
              Match History
            </Button>
            <Button
              variant={activeTab === "leaderboard" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("leaderboard")}
            >
              <Trophy className="mr-2 h-4 w-4" />
              Leaderboard
            </Button>
            <Button
              variant={activeTab === "players" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("players")}
            >
              <Users className="mr-2 h-4 w-4" />
              Players
            </Button>
            <Button variant="ghost" className="justify-start text-red-500 mt-auto">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </nav>
        </aside>
        <main className="flex-1">
          <Tabs defaultValue="singles" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <TabsList>
                <TabsTrigger value="singles">Singles</TabsTrigger>
                <TabsTrigger value="doubles">Doubles</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="singles" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Rating</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1580</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+20</span> from last match
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Matches Played</CardTitle>
                    <History className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+3</span> this week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-xs text-muted-foreground">16 wins, 8 losses</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Rating History</CardTitle>
                  <CardDescription>Your singles rating over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ratingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={["dataMin - 50", "dataMax + 50"]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="singles"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                  <CardDescription>Your last 5 singles matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { opponent: "Sarah Williams", result: "Win", score: "11-8, 11-9", rating: "+20" },
                      { opponent: "Michael Chen", result: "Loss", score: "9-11, 11-7, 9-11", rating: "-12" },
                      { opponent: "David Rodriguez", result: "Win", score: "11-7, 11-5", rating: "+18" },
                      { opponent: "Jessica Taylor", result: "Win", score: "11-9, 11-8", rating: "+15" },
                      { opponent: "Alex Johnson", result: "Loss", score: "7-11, 8-11", rating: "-10" },
                    ].map((match, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex flex-col">
                          <div className="font-medium">vs {match.opponent}</div>
                          <div className="text-sm text-muted-foreground">{match.score}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${match.result === "Win" ? "text-green-500" : "text-red-500"}`}
                          >
                            {match.result}
                          </span>
                          <span
                            className={`text-sm font-medium ${match.rating.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {match.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="doubles" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Rating</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1610</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-red-500">-10</span> from last match
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Matches Played</CardTitle>
                    <History className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+2</span> this week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">72%</div>
                    <p className="text-xs text-muted-foreground">13 wins, 5 losses</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Rating History</CardTitle>
                  <CardDescription>Your doubles rating over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ratingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={["dataMin - 50", "dataMax + 50"]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="doubles"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                  <CardDescription>Your last 5 doubles matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      {
                        partner: "Emma Davis",
                        opponents: "Olivia & Noah",
                        result: "Loss",
                        score: "9-11, 11-7, 8-11",
                        rating: "-10",
                      },
                      {
                        partner: "James Wilson",
                        opponents: "Sophia & William",
                        result: "Win",
                        score: "11-8, 11-9",
                        rating: "+15",
                      },
                      {
                        partner: "Emma Davis",
                        opponents: "Ava & Liam",
                        result: "Win",
                        score: "11-7, 11-5",
                        rating: "+18",
                      },
                      {
                        partner: "James Wilson",
                        opponents: "Isabella & Lucas",
                        result: "Win",
                        score: "11-9, 11-8",
                        rating: "+12",
                      },
                      {
                        partner: "Emma Davis",
                        opponents: "Mia & Ethan",
                        result: "Win",
                        score: "11-6, 11-9",
                        rating: "+15",
                      },
                    ].map((match, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex flex-col">
                          <div className="font-medium">
                            w/ {match.partner} vs {match.opponents}
                          </div>
                          <div className="text-sm text-muted-foreground">{match.score}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${match.result === "Win" ? "text-green-500" : "text-red-500"}`}
                          >
                            {match.result}
                          </span>
                          <span
                            className={`text-sm font-medium ${match.rating.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {match.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

