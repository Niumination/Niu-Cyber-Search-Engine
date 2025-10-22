'use client'

import { useState } from 'react'
import { Search, Zap, Globe, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface SearchResult {
  url: string
  name: string
  snippet: string
  host_name: string
  rank: number
  date: string
  favicon: string
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    setError(null)

    try {
      console.log('🔍 Sending search request for:', query)
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      console.log('📡 Response status:', response.status)
      console.log('📡 Response headers:', response.headers)

      // Check if response is valid JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.error('❌ Invalid content type:', contentType)
        setError('Invalid API response format')
        setResults([])
        return
      }

      const responseText = await response.text()
      console.log('📡 Raw response:', responseText.substring(0, 500))

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError)
        console.error('❌ Response text:', responseText)
        setError('Invalid JSON response from server')
        setResults([])
        return
      }

      console.log('📡 Parsed API Response:', data)

      if (response.ok) {
        if (data.success && data.results) {
          setResults(data.results)
          console.log('✅ Search successful, results:', data.results.length)
          if (data.mock) {
            console.log('🎭 Mock results returned (ZAI API unavailable)')
          }
        } else {
          console.log('⚠️ No results found')
          setResults([])
          if (data.error) {
            setError(data.error)
          }
        }
      } else {
        console.error('❌ API Error:', data)
        setError(data.error || data.message || 'Search failed')
        setResults([])
      }
    } catch (error) {
      console.error('💥 Network error:', error)
      setError('Network error - please try again')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 10s linear infinite'
        }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo and title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Zap className="w-12 h-12 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-cyan-400/50 animate-pulse"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-pink-500 bg-clip-text text-transparent">
              CYBER
            </h1>
            <div className="relative">
              <Globe className="w-12 h-12 text-pink-500 animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-pink-500/50 animate-pulse"></div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-green-300 font-mono mb-2">
            &gt; NEURAL_SEARCH_ENGINE_v2.0
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-green-500 font-mono">
            <Badge variant="outline" className="border-cyan-500 text-cyan-400">
              <Cpu className="w-3 h-3 mr-1" />
              AI_POWERED
            </Badge>
            <Badge variant="outline" className="border-pink-500 text-pink-400">
              REAL_TIME
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-400">
              DEEP_WEB
            </Badge>
          </div>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex gap-2">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ENTER SEARCH_QUERY..."
                className="flex-1 bg-black/80 border-cyan-500/50 text-green-400 placeholder-green-600 font-mono text-lg px-6 py-4 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-500 hover:to-pink-500 text-black font-bold px-8"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    SCANNING...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    SEARCH
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Search results */}
        {searched && (
          <div className="w-full max-w-4xl">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="bg-black/60 border-cyan-500/30 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-3/4 mb-2 bg-cyan-500/20" />
                      <Skeleton className="h-3 w-full mb-1 bg-green-500/20" />
                      <Skeleton className="h-3 w-2/3 bg-green-500/20" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-400 font-mono text-lg mb-4">
                  &gt; SEARCH_ERROR_DETECTED
                </p>
                <p className="text-orange-400 font-mono mb-4">
                  {error}
                </p>
                <p className="text-green-600 font-mono text-sm">
                  CHECK_CONSOLE_LOGS_FOR_DETAILS_OR_TRY_AGAIN
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-green-400 font-mono">
                    FOUND {results.length} RESULTS_IN_THE_MATRIX
                  </p>
                  {results.some(r => (r as any).mock) && (
                    <p className="text-yellow-400 font-mono text-sm mt-2">
                      🎭 SIMULATION_MODE - ZAI_API_UNAVAILABLE
                    </p>
                  )}
                </div>
                {results.map((result, index) => (
                  <Card 
                    key={index} 
                    className="bg-black/60 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-pink-500 rounded flex items-center justify-center text-black font-bold text-sm">
                          {result.rank}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-cyan-400 mb-2 hover:text-pink-400 transition-colors">
                            <a href={result.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              {result.name}
                              <span className="text-xs text-green-500 font-mono">[{result.host_name}]</span>
                            </a>
                          </h3>
                          <p className="text-green-300 font-mono text-sm mb-2 leading-relaxed">
                            {result.snippet}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-green-600 font-mono">
                            <span>{result.url}</span>
                            <span>•</span>
                            <span>{result.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-red-400 font-mono text-lg mb-4">
                  &gt; NO_RESULTS_FOUND_IN_THE_MATRIX
                </p>
                <p className="text-green-600 font-mono">
                  TRY_DIFFERENT_KEYWORDS_OR_CHECK_YOUR_CONNECTION
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}