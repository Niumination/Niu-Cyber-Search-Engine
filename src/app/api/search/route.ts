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
        { 
          success: false,
          error: 'Invalid search query', 
          details: 'Query must be a non-empty string' 
        },
        { status: 400 }
      )
    }

    console.log('🚀 Initializing ZAI SDK...')
    
    // Check if API key is available
    const apiKey = process.env.ZAI_API_KEY || process.env.NEXT_PUBLIC_ZAI_API_KEY
    if (!apiKey) {
      console.log('❌ No API key found')
      return NextResponse.json(
        { 
          success: false,
          error: 'API configuration error',
          details: 'ZAI_API_KEY not found in environment variables'
        },
        { status: 500 }
      )
    }

    console.log('✅ API key found, length:', apiKey.length)
    
    // Initialize ZAI SDK with API key
    const zai = await ZAI.create({ apiKey })
    console.log('✅ ZAI SDK initialized successfully')

    console.log('🌐 Performing web search for:', query)
    
    // Add shorter timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Search timeout after 15 seconds')), 15000)
    })

    const searchPromise = zai.functions.invoke("web_search", {
      query: query,
      num: 10
    })

    const searchResult = await Promise.race([searchPromise, timeoutPromise])
    
    console.log('📊 Search completed, validating response...')
    
    // Validate response format
    if (!searchResult) {
      console.log('⚠️ No search result received')
      return NextResponse.json({
        success: true,
        results: [],
        query: query,
        count: 0,
        message: 'No results found'
      })
    }

    if (!Array.isArray(searchResult)) {
      console.log('⚠️ Invalid response format:', typeof searchResult)
      console.log('🔍 Response preview:', JSON.stringify(searchResult).substring(0, 200))
      return NextResponse.json({
        success: true,
        results: [],
        query: query,
        count: 0,
        message: 'Invalid response format from search API'
      })
    }

    console.log('📊 Search results received:', searchResult.length)
    
    // Validate each result has required fields
    const validResults = searchResult.filter(result => 
      result && 
      typeof result === 'object' && 
      result.url && 
      result.name
    )

    console.log('✅ Valid results:', validResults.length, 'of', searchResult.length)

    return NextResponse.json({
      success: true,
      results: validResults,
      query: query,
      count: validResults.length
    })

  } catch (error: any) {
    console.error('💥 Search API error:', error)
    console.error('📋 Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    // Return proper JSON error response
    return NextResponse.json(
      { 
        success: false,
        error: 'Search failed',
        message: error.message || 'Unknown error occurred',
        details: error.stack || 'No stack trace available',
        query: query || 'No query provided'
      },
      { status: 500 }
    )
  }
}