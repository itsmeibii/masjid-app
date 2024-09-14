import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const TableSkeleton = () => {
    const styles = StyleSheet.create({})
  return (
    <ContentLoader viewBox="0 0 380 70" backgroundColor='#b4e380'>
    <Rect x="10" y="10" rx="4" ry="4" width="30" height="20" />
    <Rect x="70" y="10" rx="4" ry="4" width="30" height="20" />
    <Rect x="130" y="10" rx="4" ry="4" width="30" height="20" />
    <Rect x="190" y="10" rx="4" ry="4" width="30" height="20" />
    <Rect x="250" y="10" rx="4" ry="4" width="30" height="20" />
    <Rect x="310" y="10" rx="4" ry="4" width="30" height="20" />
    
    
    <Rect x="10" y="40" rx="4" ry="4" width="30" height="20" />
    <Rect x="70" y="40" rx="4" ry="4" width="30" height="20" />
    <Rect x="130" y="40" rx="4" ry="4" width="30" height="20" />
    <Rect x="190" y="40" rx="4" ry="4" width="30" height="20" />
    <Rect x="250" y="40" rx="4" ry="4" width="30" height="20" />
    <Rect x="310" y="40" rx="4" ry="4" width="30" height="20" />

    <Rect x="10" y="70" rx="4" ry="4" width="30" height="20" />
    <Rect x="70" y="70" rx="4" ry="4" width="30" height="20" />
    <Rect x="130" y="70" rx="4" ry="4" width="30" height="20" />
    <Rect x="190" y="70" rx="4" ry="4" width="30" height="20" />
    <Rect x="250" y="70" rx="4" ry="4" width="30" height="20" />
    <Rect x="310" y="70" rx="4" ry="4" width="30" height="20" />
  </ContentLoader>
  )
}

export default TableSkeleton

