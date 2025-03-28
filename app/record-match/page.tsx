"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, ArrowLeft } from "lucide-react"

export default function RecordMatchPage() {
  const [matchType, setMatchType] = useState("singles")
  const [player1Score, setPlayer1Score] = useState("")
  const [player2Score, setPlayer2Score] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Here you would implement Firebase data storage
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Navigate to dashboard after successful submission
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Match recording failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="mx-auto flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Record Match</h1>
          </div>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>
      </header>
      <main className="container flex-1 py-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Record a New Match</CardTitle>
            <CardDescription>Enter the match details to update ELO ratings</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Match Type</Label>
                <Tabs defaultValue="singles" onValueChange={setMatchType} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="singles">Singles</TabsTrigger>
                    <TabsTrigger value="doubles">Doubles</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {matchType === "singles" ? (
                <div className="grid gap-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="opponent">Opponent</Label>
                      <Select>
                        <SelectTrigger id="opponent">
                          <SelectValue placeholder="Select opponent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah">Sarah Williams</SelectItem>
                          <SelectItem value="michael">Michael Chen</SelectItem>
                          <SelectItem value="david">David Rodriguez</SelectItem>
                          <SelectItem value="jessica">Jessica Taylor</SelectItem>
                          <SelectItem value="alex">Alex Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="your-score">Your Score</Label>
                        <Input
                          id="your-score"
                          placeholder="Your score"
                          value={player1Score}
                          onChange={(e) => setPlayer1Score(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="opponent-score">Opponent Score</Label>
                        <Input
                          id="opponent-score"
                          placeholder="Opponent score"
                          value={player2Score}
                          onChange={(e) => setPlayer2Score(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partner">Your Partner</Label>
                      <Select>
                        <SelectTrigger id="partner">
                          <SelectValue placeholder="Select partner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emma">Emma Davis</SelectItem>
                          <SelectItem value="james">James Wilson</SelectItem>
                          <SelectItem value="olivia">Olivia Martinez</SelectItem>
                          <SelectItem value="noah">Noah Thompson</SelectItem>
                          <SelectItem value="sophia">Sophia Anderson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Opponents</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Opponent 1" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="olivia">Olivia Martinez</SelectItem>
                            <SelectItem value="noah">Noah Thompson</SelectItem>
                            <SelectItem value="sophia">Sophia Anderson</SelectItem>
                            <SelectItem value="william">William Brown</SelectItem>
                            <SelectItem value="ava">Ava Garcia</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Opponent 2" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="noah">Noah Thompson</SelectItem>
                            <SelectItem value="sophia">Sophia Anderson</SelectItem>
                            <SelectItem value="william">William Brown</SelectItem>
                            <SelectItem value="ava">Ava Garcia</SelectItem>
                            <SelectItem value="liam">Liam Miller</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="your-team-score">Your Team Score</Label>
                        <Input
                          id="your-team-score"
                          placeholder="Your team score"
                          value={player1Score}
                          onChange={(e) => setPlayer1Score(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="opponent-team-score">Opponent Team Score</Label>
                        <Input
                          id="opponent-team-score"
                          placeholder="Opponent team score"
                          value={player2Score}
                          onChange={(e) => setPlayer2Score(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Match Format</Label>
                <RadioGroup defaultValue="best-of-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="best-of-3" id="best-of-3" />
                    <Label htmlFor="best-of-3">Best of 3 Games</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="best-of-5" id="best-of-5" />
                    <Label htmlFor="best-of-5">Best of 5 Games</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single-game" id="single-game" />
                    <Label htmlFor="single-game">Single Game</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Recording Match..." : "Record Match"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}

