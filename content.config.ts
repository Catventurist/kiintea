import { defineContentConfig, defineCollection, property } from '@nuxt/content'
import { z } from 'zod/v4'

const pageSchema = z.object({
  layout: z.enum(['default', 'dashboard']).optional(),
  sidebar: z.boolean().optional(),
  collapsed: z.boolean().optional(),
  splitter: z.boolean().optional(),
  toc: z.boolean().optional(),
  surround: z.boolean().optional(),
  rawbody: z.string()
})

const glossarySchema = z.object({
  title: z.string().optional(),
  text: z.string().optional(),
  description: z.string().optional(),
  to: z.string().optional(),
  icon: property(z.string()).editor({ input: 'icon' }),
  tags: z.array(z.string()).optional()
})

const problemSchema = z.object({
  slug: z.string(),
  problem: z.string(),
  cause: z.string(),
  fix: z.string(),
  severity: z.enum(['error', 'warning', 'info']).optional(),
  tags: z.array(z.string()).optional(),
  since: z.string().optional(),
  code: z.object({
    lang: z.string().optional(),
    file: z.string().optional(),
    content: z.string()
  }).optional(),
  links: z.array(z.object({ label: z.string(), to: z.string() })).optional()
})

const värit = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as const

const viikkoSchema = z.object({
  viikko: z.number(),
  kääre: z.string(),
  suola: z.string().optional(),
  lähtö: z.date().optional(),
  päätös: z.date().optional(),
  tila: z.enum(['käynnissä', 'valmis', 'varastoitu']).default('käynnissä'),
  päättely: z.enum(['kaikki', 'enemmistö', 'superenemmistö', 'pluriteetti', 'konsensus']).default('kaikki'),
  kuorum: z.number().int().min(1).optional(),
  tarkiste: z.string().optional(),
  jutut: z.array(z.object({
    nimi: z.string(),
    miksi: z.string().optional(),
    kynnys: z.enum(['ok', 'osittain']).default('ok'),
    paino: z.number().default(1),
    väri: z.enum(värit).default('primary'),
    päivät: z.array(z.object({
      päivä: z.enum(['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su']),
      bitti: z.string().optional(),
      hetki: z.date().optional(),
      muistiinpano: z.string().optional(),
      arvio: z.number().int().min(1).max(5).optional()
    })).optional()
  }))
})

const entities = [
  'agent', 'agreement', 'agreement-bundle', 'claim', 'commitment', 'economic-event',
  'economic-resource', 'fulfillment', 'intent', 'plan', 'process', 'process-specification',
  'proposal', 'proposed-intent', 'recipe-exchange', 'recipe-flow', 'recipe-process',
  'resource-specification', 'satisfaction', 'spatial-thing', 'unit'
] as const

const entity = z.enum(entities)
const entityLink = entity.optional()

const flowSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  glossary: z.string().optional(),
  entity,
  layer: z.enum(['knowledge', 'plan', 'observation', 'agent']),
  example: z.string().optional(),
  operations: z.array(z.enum(['create', 'update', 'delete'])).default([]),
  params: z.object({
    inputOf: entityLink,
    outputOf: entityLink,
    observedInputs: entityLink,
    observedOutputs: entityLink,
    unplannedEconomicEvents: entityLink,
    committedInputs: entityLink,
    committedOutputs: entityLink,
    intendedInputs: entityLink,
    intendedOutputs: entityLink,
    workingAgents: entityLink,
    fulfills: entityLink,
    fulfilledBy: entityLink,
    satisfies: entityLink,
    satisfiedBy: entityLink,
    clauseOf: entityLink,
    realizationOf: entityLink,
    affects: entityLink,
    proposedIn: entityLink,
    publishedIn: entityLink,
    independentDemandOf: entityLink,
    plannedWithin: entityLink,
    inScopeOf: entityLink,
    provider: entityLink,
    receiver: entityLink,
    agentType: z.string().optional(),
    contains: entityLink,
    containedIn: entityLink,
    conformsTo: entityLink,
    conformingResources: entityLink,
    affectedBy: entityLink,
    primaryAccountable: entityLink,
    recipeInputOf: entityLink,
    recipeOutputOf: entityLink,
    recipeClauseOf: entityLink,
    recipeReciprocal: entityLink
  }).strict().optional()
})

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        exclude: ['en/index.md', 'en/glossary/**', 'en/problems/*.yml', 'en/viikot/*.yml', 'en/flow/*.yml']
      },
      schema: pageSchema
    }),
    content_fi: defineCollection({
      type: 'page',
      source: {
        include: 'fi/**',
        exclude: ['fi/index.md', 'fi/glossary/**', 'fi/problems/*.yml', 'fi/viikot/*.yml', 'fi/flow/*.yml']
      },
      schema: pageSchema
    }),
    landing_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/index.md'
      },
      schema: pageSchema
    }),
    landing_fi: defineCollection({
      type: 'page',
      source: {
        include: 'fi/index.md'
      },
      schema: pageSchema
    }),
    glossary_en: defineCollection({
      type: 'data',
      source: 'en/glossary/**/*.yml',
      schema: glossarySchema
    }),
    glossary_fi: defineCollection({
      type: 'data',
      source: 'fi/glossary/**/*.yml',
      schema: glossarySchema
    }),
    problems_en: defineCollection({
      type: 'data',
      source: 'en/problems/*.yml',
      schema: problemSchema
    }),
    problems_fi: defineCollection({
      type: 'data',
      source: 'fi/problems/*.yml',
      schema: problemSchema
    }),
    viikot_en: defineCollection({
      type: 'data',
      source: 'en/viikot/*.yml',
      schema: viikkoSchema
    }),
    viikot_fi: defineCollection({
      type: 'data',
      source: 'fi/viikot/*.yml',
      schema: viikkoSchema
    }),
    flow_en: defineCollection({
      type: 'data',
      source: {
        include: 'en/flow/*.yml'
      },
      schema: flowSchema
    }),
    flow_fi: defineCollection({
      type: 'data',
      source: {
        include: 'fi/flow/*.yml'
      },
      schema: flowSchema
    })
  }
})
