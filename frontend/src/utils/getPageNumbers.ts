export function getPageNumbers(current: number, total: number): (number | "...")[] {
  const set = new Set(
    [1, total, current - 1, current, current + 1]
      .filter(p => p >= 1 && p <= total)
  )
  const sorted = Array.from(set).sort((a, b) => a - b)

  const result: (number | "...")[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...")
    result.push(sorted[i])
  }
  return result
}