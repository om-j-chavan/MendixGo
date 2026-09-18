/**
 * MendixGo course model — the single schema everything is built against.
 *
 * A Course is a track (Interview / Cortex / Intermediate). Each course is a
 * path of Units; each Unit is a short sequence of Lessons; each Lesson is a
 * handful of Exercises. Content files (./interview, ./cortex, ./intermediate)
 * author data to this shape; pages + the lesson runner consume it.
 */

export type Exercise =
  // single-answer multiple choice
  | { kind: 'choice'; q: string; options: string[]; correct: number; why: string }
  // select-all-that-apply
  | { kind: 'multi'; q: string; options: string[]; correct: number[]; why: string }
  // tap each term to its meaning
  | { kind: 'match'; prompt: string; pairs: { term: string; def: string }[] }
  // interview Q&A: read, tap to reveal the model answer, self-rate (feeds spaced repetition)
  | { kind: 'reveal'; q: string; answer: string; hint?: string }
  // put steps into the right order (great for build sequences / flows)
  | { kind: 'order'; q: string; items: string[]; why: string }

export interface Lesson {
  id: string
  title: string
  exercises: Exercise[]
}

export interface Unit {
  id: string
  title: string
  icon: string // emoji
  blurb?: string
  lessons: Lesson[]
}

export interface Course {
  id: CourseId
  title: string
  subtitle: string
  icon: string
  color: string // theme accent (hex)
  blurb: string
  units: Unit[]
}

export type CourseId = 'interview' | 'cortex' | 'intermediate' | 'python'

import { interviewCourse } from './interview'
import { cortexCourse } from './cortex'
import { intermediateCourse } from './intermediate'
import { pythonCourse } from './python'

export const COURSES: Course[] = [interviewCourse, pythonCourse, cortexCourse, intermediateCourse]

export const COURSE_BY_ID: Record<string, Course> = Object.fromEntries(COURSES.map((c) => [c.id, c]))

/* ------------------------------- helpers ------------------------------- */

/** Stable global key for a lesson's completion: course:unit:lesson */
export function lessonKey(courseId: string, unitId: string, lessonId: string): string {
  return `${courseId}:${unitId}:${lessonId}`
}

/** Stable per-exercise id (for spaced repetition scheduling of reveal cards). */
export function exerciseId(courseId: string, unitId: string, lessonId: string, idx: number): string {
  return `${courseId}:${unitId}:${lessonId}:${idx}`
}

export interface FlatLesson {
  courseId: string
  unitId: string
  lessonId: string
  unit: Unit
  lesson: Lesson
  key: string
}

/** All lessons of a course in path order. */
export function courseSequence(course: Course): FlatLesson[] {
  const out: FlatLesson[] = []
  for (const unit of course.units) {
    for (const lesson of unit.lessons) {
      out.push({
        courseId: course.id,
        unitId: unit.id,
        lessonId: lesson.id,
        unit,
        lesson,
        key: lessonKey(course.id, unit.id, lesson.id),
      })
    }
  }
  return out
}

export function courseLessonCount(course: Course): number {
  return course.units.reduce((n, u) => n + u.lessons.length, 0)
}

export function findLesson(courseId: string, unitId: string, lessonId: string): FlatLesson | null {
  const course = COURSE_BY_ID[courseId]
  if (!course) return null
  const unit = course.units.find((u) => u.id === unitId)
  const lesson = unit?.lessons.find((l) => l.id === lessonId)
  if (!unit || !lesson) return null
  return { courseId, unitId, lessonId, unit, lesson, key: lessonKey(courseId, unitId, lessonId) }
}

/** Count of reveal exercises in a course (the interview-style Q&A that feed SRS). */
export function courseRevealCount(course: Course): number {
  let n = 0
  for (const u of course.units) for (const l of u.lessons) for (const e of l.exercises) if (e.kind === 'reveal') n++
  return n
}
