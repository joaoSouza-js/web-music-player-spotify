type shortDescription = {
    description: string,
    maxChar?: number,
    concat?: string
}

export function shortDescription({description,concat="...",maxChar=38}: shortDescription) {
    const descriptionFormatted = description.slice(0, maxChar).concat(concat)
    return descriptionFormatted
  }