export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          color: string | null
          description: string | null
          icon_name: string | null
          id: string
          title: string
        }
        Insert: {
          color?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          title: string
        }
        Update: {
          color?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          instructor_name: string | null
          skill_track: string
          thumbnail_url: string | null
          title: string
          total_lessons: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          instructor_name?: string | null
          skill_track: string
          thumbnail_url?: string | null
          title: string
          total_lessons?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          instructor_name?: string | null
          skill_track?: string
          thumbnail_url?: string | null
          title?: string
          total_lessons?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      mentor_profiles: {
        Row: {
          bio: string | null
          created_at: string
          expertise_areas: string[] | null
          hourly_rate: number | null
          id: string
          is_available: boolean | null
          linkedin_url: string | null
          onboarding_completed: boolean | null
          phone: string | null
          portfolio_url: string | null
          updated_at: string
          user_id: string
          verification_status: string | null
          years_of_experience: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          expertise_areas?: string[] | null
          hourly_rate?: number | null
          id?: string
          is_available?: boolean | null
          linkedin_url?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          portfolio_url?: string | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
          years_of_experience?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          expertise_areas?: string[] | null
          hourly_rate?: number | null
          id?: string
          is_available?: boolean | null
          linkedin_url?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          portfolio_url?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      mentor_qualifications: {
        Row: {
          certificate_url: string | null
          created_at: string
          id: string
          institution: string
          is_verified: boolean | null
          mentor_id: string
          title: string
          year_obtained: number | null
        }
        Insert: {
          certificate_url?: string | null
          created_at?: string
          id?: string
          institution: string
          is_verified?: boolean | null
          mentor_id: string
          title: string
          year_obtained?: number | null
        }
        Update: {
          certificate_url?: string | null
          created_at?: string
          id?: string
          institution?: string
          is_verified?: boolean | null
          mentor_id?: string
          title?: string
          year_obtained?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_qualifications_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_sessions: {
        Row: {
          created_at: string
          description: string | null
          end_time: string
          id: string
          max_participants: number | null
          meeting_link: string | null
          mentor_id: string
          session_date: string
          session_type: string | null
          start_time: string
          status: string | null
          student_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          max_participants?: number | null
          meeting_link?: string | null
          mentor_id: string
          session_date: string
          session_type?: string | null
          start_time: string
          status?: string | null
          student_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          max_participants?: number | null
          meeting_link?: string | null
          mentor_id?: string
          session_date?: string
          session_type?: string | null
          start_time?: string
          status?: string | null
          student_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_sessions_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      school_profiles: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          onboarding_completed: boolean | null
          school_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          onboarding_completed?: boolean | null
          school_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          onboarding_completed?: boolean | null
          school_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      school_students: {
        Row: {
          enrolled_at: string
          id: string
          school_id: string
          student_id: string
        }
        Insert: {
          enrolled_at?: string
          id?: string
          school_id: string
          student_id: string
        }
        Update: {
          enrolled_at?: string
          id?: string
          school_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_students_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "school_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          student_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          student_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_achievements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_enrollments: {
        Row: {
          course_id: string
          enrolled_at: string
          id: string
          lessons_completed: number | null
          progress: number | null
          student_id: string
          updated_at: string
        }
        Insert: {
          course_id: string
          enrolled_at?: string
          id?: string
          lessons_completed?: number | null
          progress?: number | null
          student_id: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          enrolled_at?: string
          id?: string
          lessons_completed?: number | null
          progress?: number | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          bio: string | null
          created_at: string
          date_of_birth: string | null
          grade_level: string | null
          id: string
          interests: string[] | null
          onboarding_completed: boolean | null
          phone: string | null
          school_name: string | null
          skill_tracks: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          grade_level?: string | null
          id?: string
          interests?: string[] | null
          onboarding_completed?: boolean | null
          phone?: string | null
          school_name?: string | null
          skill_tracks?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          grade_level?: string | null
          id?: string
          interests?: string[] | null
          onboarding_completed?: boolean | null
          phone?: string | null
          school_name?: string | null
          skill_tracks?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "mentor" | "student" | "school"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "mentor", "student", "school"],
    },
  },
} as const
