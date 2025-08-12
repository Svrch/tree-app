import type { TreeItem } from '../types'

export class TreeStore {
  private items: TreeItem[]
  private itemsById: Map<string | number, TreeItem>
  private childrenById: Map<string | number, TreeItem[]>

  constructor(items: TreeItem[]) {
    this.items = items
    this.itemsById = new Map()
    this.childrenById = new Map()

    // Инициализация хэш-таблиц
    this.items.forEach(item => {
      // Заполняем itemsById
      this.itemsById.set(item.id, item)

      // Заполняем childrenById
      const parentKey = item.parent ?? 'null' // null заменяем строкой для Map
      if (!this.childrenById.has(parentKey)) {
        this.childrenById.set(parentKey, [])
      }
      this.childrenById.get(parentKey)!.push(item)
    })
  }

  getAll(): TreeItem[] {
    return this.items
  }

  getItem(id: string | number): TreeItem | undefined {
    return this.itemsById.get(id)
  }

  getChildren(id: string | number | null): TreeItem[] {
    const key = id ?? 'null'
    return this.childrenById.get(key) ?? []
  }

  getAllChildren(id: string | number): TreeItem[] {
    const result: TreeItem[] = []
    const stack = [...this.getChildren(id)]

    while (stack.length > 0) {
      const item = stack.pop()!
      result.push(item)
      stack.push(...this.getChildren(item.id))
    }

    return result
  }

  getAllParents(id: string | number): TreeItem[] {
    const result: TreeItem[] = []
    let currentId: string | number | null = id

    while (currentId !== null) {
      const item = this.itemsById.get(currentId)
      if (!item) break
      result.push(item)
      currentId = item.parent
    }

    return result
  }

  addItem(item: TreeItem): void {
    this.items.push(item)
    this.itemsById.set(item.id, item)

    const parentKey = item.parent ?? 'null'
    if (!this.childrenById.has(parentKey)) {
      this.childrenById.set(parentKey, [])
    }
    this.childrenById.get(parentKey)!.push(item)
  }

  removeItem(id: string | number): void {
    const item = this.getItem(id)
    if (!item) return

    // Удаляем всех детей
    this.getAllChildren(id).forEach(child => {
      this.itemsById.delete(child.id)
      this.items = this.items.filter(i => i.id !== child.id)
    })

    // Удаляем сам элемент
    this.itemsById.delete(id)
    this.items = this.items.filter(i => i.id !== id)

    // Удаляем из childrenById родителя
    const parentKey = item.parent ?? 'null'
    if (this.childrenById.has(parentKey)) {
      this.childrenById.set(
        parentKey,
        this.childrenById.get(parentKey)!.filter(i => i.id !== id),
      )
    }
  }

  updateItem(item: TreeItem): void {
    const existingItem = this.itemsById.get(item.id)
    if (!existingItem) return

    // Обновляем родителя если изменился
    if (existingItem.parent !== item.parent) {
      const oldParentKey = existingItem.parent ?? 'null'
      const newParentKey = item.parent ?? 'null'

      // Удаляем из старого родителя
      this.childrenById.set(
        oldParentKey,
        this.childrenById.get(oldParentKey)!.filter(i => i.id !== item.id),
      )

      // Добавляем к новому родителю
      if (!this.childrenById.has(newParentKey)) {
        this.childrenById.set(newParentKey, [])
      }
      this.childrenById.get(newParentKey)!.push(item)
    }

    // Обновляем сам элемент
    Object.assign(existingItem, item)
    this.itemsById.set(item.id, existingItem)
  }
}
