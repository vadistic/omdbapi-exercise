import { FindConditions, FindOperator, ILike, Equal } from 'typeorm'

export const buildWhere = <Entity>(search: FindConditions<Entity>): FindConditions<Entity> => {
  const entires = Object.entries(search)
  const where: any = {}

  console.log('search', search)

  if (entires.length === 0) return {}

  for (const [key, val] of entires) {
    if (val instanceof FindOperator) {
      where[key] = val
    }

    if (typeof val === 'string' && val) {
      where[key] = ILike(val)
    }

    if (typeof val === 'number') {
      where[key] = Equal(val)
    }
  }

  console.log('where', where)

  return where
}
