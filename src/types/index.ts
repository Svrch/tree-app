export interface TreeItem {
  id: string | number
  parent: string | number | null
  [key: string]: any // Произвольные дополнительные поля (например, label)
}
