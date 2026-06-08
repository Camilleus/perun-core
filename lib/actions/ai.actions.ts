'use server';

import { createClient } from '@/lib/supabase/server';
import { getProjectWithMargin } from './project.actions';
import { ActionResult } from '@/types';

export async function analyzeProjectRisks(projectId: string): Promise<ActionResult<{
  summary: string;
  threats: string[];
  recommendations: string[];
  health_score: number;
}>> {
  try {
    const project = await getProjectWithMargin(projectId);
    const supabase = await createClient();

    const { data: risks } = await supabase
      .from('risks')
      .select('*')
      .eq('project_id', projectId);

    // Context used for AI analysis (internal log or payload for API)
    console.log('AI Analysis Context:', {
      project: {
        name: project.name,
        budget_planned_pln: project.budget_planned_pln,
        cost_actual_pln: project.cost_actual_pln,
        margin_percentage: project.margin_percentage,
        burn_percentage: project.burn_percentage,
        stages: project.project_stages,
      },
      risks: risks || [],
    });

    // System Prompt for Margin Protection
    // Note: This would be used when calling an actual AI model
    /*
    const systemPrompt = `
      Jesteś ekspertem ds. ochrony marży w projektach budowlanych i montażowych.
      Twoim zadaniu jest analiza poniższych danych projektu i dostarczenie 3 konkretnych,
      strategicznych rekomendacji, które pomogą uratować lub zmaksymalizować marżę.

      Skup się na:
      1. Wykrywaniu anomalii w tempie wydatkowania (Burn %).
      2. Adresowaniu ryzyk z rejestru.
      3. Sugerowaniu optymalizacji kosztów w pozostałych etapach.

      Odpowiadaj w formacie JSON:
      {
        "summary": "krótkie podsumowanie stanu finansowego (po polsku)",
        "threats": ["lista 2-3 konkretnych zagrożeń"],
        "recommendations": ["lista 3 konkretnych akcji do podjęcia"],
        "health_score": 0-100 (liczba)
      }
    `;
    */

    // In a real app, you would call Claude API here.
    // For this task, we will simulate the response based on project health.

    let summary = "";
    let threats: string[] = [];
    let recommendations: string[] = [];
    let healthScore = 100;

    const burn = project.burn_percentage;

    if (burn > 100) {
      summary = `PROJEKT PRZEKROCZYŁ BUDŻET o ${(burn - 100).toFixed(1)}%. Marża została całkowicie skonsumowana.`;
      threats = ["Brak środków na dokończenie prac", "Konieczność finansowania z własnej kieszeni"];
      recommendations = ["Natychmiastowe wstrzymanie kosztów opcjonalnych", "Rewizja zakresu z klientem (Change Orders)", "Analiza przyczyn przekroczenia dla przyszłych ofert"];
      healthScore = 10;
    } else if (burn > 90) {
      summary = `Sytuacja krytyczna. Zużyto ${burn.toFixed(1)}% budżetu. Pozostała marża jest minimalna.`;
      threats = ["Wysokie prawdopodobieństwo straty", "Brak marginesu na błędy w końcowych etapach"];
      recommendations = ["Negocjacja cen z dostawcami na ostatnie materiały", "Maksymalna optymalizacja robocizny", "Weryfikacja czy wszystkie koszty zostały już zaksięgowane"];
      healthScore = 35;
    } else if (burn > 75) {
      summary = `Ostrzeżenie: Projekt wszedł w fazę podwyższonego ryzyka (${burn.toFixed(1)}% burn). Marża zaczyna topnieć.`;
      threats = ["Ryzyko przekroczenia budżetu w ostatniej fazie", "Potencjalne niedoszacowanie kosztów końcowych"];
      recommendations = ["Szczegółowa kontrola kosztów etapu ${project.project_stages?.[project.project_stages.length - 1]?.name || 'końcowego'}", "Przegląd ryzyk o wysokim wpływie", "Cotygodniowy raport statusu finansowego"];
      healthScore = 65;
    } else {
      summary = `Projekt jest zdrowy. Marża wynosi ${project.margin_percentage.toFixed(1)}%, a zużycie budżetu to ${burn.toFixed(1)}%.`;
      threats = ["Standardowe ryzyka operacyjne", "Możliwe opóźnienia dostaw"];
      recommendations = ["Utrzymanie obecnej dyscypliny kosztowej", "Zabezpieczenie cen materiałów na kolejne etapy", "Dokumentowanie oszczędności"];
      healthScore = 90;
    }

    return {
      success: true,
      data: {
        summary,
        threats,
        recommendations,
        health_score: healthScore
      }
    };
  } catch (err) {
    const error = err as Error;
    return { success: false, error: error.message };
  }
}
