import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  console.log('🔍 Search API called')
  
  try {
    const { query } = await request.json()
    console.log('📝 Query received:', query)

    if (!query || typeof query !== 'string') {
      console.log('❌ Invalid query')
      return NextResponse.json(
        { error: 'Invalid search query', details: 'Query must be a non-empty string' },
        { status: 400 }
      )
    }

    console.log('🚀 Initializing ZAI SDK...')
    // Initialize ZAI SDK
    const zai = await ZAI.create()
    console.log('✅ ZAI SDK initialized successfully')

    console.log('🌐 Performing web search for:', query)
    // Perform web search
    const searchResult = await zai.functions.invoke("web_search", {
      query: query,
      num: 10 // Return top 10 results
    })
    
    console.log('📊 Search results received:', Array.isArray(searchResult) ? searchResult.length : 'Invalid format')
    console.log('🔍 First result preview:', searchResult[0] ? JSON.stringify(searchResult[0], null, 2).substring(0, 200) + '...' : 'No results')

    return NextResponse.json({
      success: true,
      results: searchResult || [],
      query: query,
      count: Array.isArray(searchResult) ? searchResult.length : 0
    })

  } catch (error: any) {
    console.error('💥 Search API error:', error)
    console.error('📋 Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    return NextResponse.json(
      { 
        error: 'Search failed',
        message: error.message || 'Unknown error occurred',
        details: error.stack || 'No stack trace available',
        query: query || 'No query provided'
      },
      { status: 500 }
    )
  }
}