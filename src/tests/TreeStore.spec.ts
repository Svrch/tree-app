import { describe, expect, it } from 'vitest'
import { TreeStore } from '../stores/TreeStore'

const items = [
  { id: 1, parent: null, label: 'Айтем 1' },
  { id: '2', parent: 1, label: 'Айтем 2' },
  { id: 3, parent: 1, label: 'Айтем 3' },
  { id: 4, parent: '2', label: 'Айтем 4' },
  { id: 5, parent: '2', label: 'Айтем 5' },
]

describe('TreeStore', () => {
  const store = new TreeStore(items) // Теперь передаём массив напрямую

  it('getAll() возвращает исходный массив', () => {
    expect(store.getAll()).toEqual(items)
  })

  it('getItem() возвращает корректный элемент', () => {
    expect(store.getItem(1)).toEqual(items[0])
    expect(store.getItem('2')).toEqual(items[1])
    expect(store.getItem(999)).toBeUndefined() // Несуществующий ID
  })

  it('getChildren() возвращает потомков', () => {
    expect(store.getChildren(1)).toEqual([items[1], items[2]])
    expect(store.getChildren('2')).toEqual([items[3], items[4]])
    expect(store.getChildren(null)).toEqual([items[0]]) // Корневые элементы
    expect(store.getChildren(999)).toEqual([]) // Нет детей
  })

  it('getAllChildren() возвращает всех потомков (без учёта порядка)', () => {
    const childrenOf1 = store.getAllChildren(1)
    expect(childrenOf1).toHaveLength(4) // Айтемы 2, 3, 4, 5
    expect(childrenOf1).toContainEqual(items[1]) // Айтем 2
    expect(childrenOf1).toContainEqual(items[2]) // Айтем 3
    expect(childrenOf1).toContainEqual(items[3]) // Айтем 4
    expect(childrenOf1).toContainEqual(items[4]) // Айтем 5

    const childrenOf2 = store.getAllChildren('2')
    expect(childrenOf2).toHaveLength(2) // Айтемы 4, 5
    expect(childrenOf2).toContainEqual(items[3]) // Айтем 4
    expect(childrenOf2).toContainEqual(items[4]) // Айтем 5

    expect(store.getAllChildren(3)).toEqual([]) // Нет детей
  })

  it('getAllParents() возвращает цепочку родителей', () => {
    expect(store.getAllParents(4)).toEqual([items[3], items[1], items[0]])
    expect(store.getAllParents(1)).toEqual([items[0]])
    expect(store.getAllParents(999)).toEqual([]) // Несуществующий элемент
  })

  it('addItem() добавляет новый элемент', () => {
    const newItem = { id: 6, parent: 3, label: 'Айтем 6' }
    store.addItem(newItem)
    expect(store.getItem(6)).toEqual(newItem)
    expect(store.getChildren(3)).toEqual([newItem])
  })

  it('removeItem() удаляет элемент и его потомков', () => {
    store.removeItem('2')
    expect(store.getItem('2')).toBeUndefined()
    expect(store.getItem(4)).toBeUndefined() // Должен быть удалён как потомок
    expect(store.getChildren(1)).toEqual([items[2]]) // Остался только элемент 3
  })

  it('updateItem() обновляет элемент', () => {
    const updatedItem = { ...items[2], label: 'Обновлённый айтем 3' }
    store.updateItem(updatedItem)
    expect(store.getItem(3)).toEqual(updatedItem)
  })
})
