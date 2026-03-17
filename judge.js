// ==========================================
// Universal Dragon • NOVA Quantum Arbiter
// 7th-Dimension Output Evaluation Layer
// Precision Scoring • Hallucination Defense
// ==========================================

const MINIMUM_PASS_SCORE = 65;

const BONUS_RULES = [
  {
    key: 'structured_output',
    points: 15,
    test: ({ isStructured }) => isStructured
  },
  {
    key: 'depth_bonus',
    points: 10,
    test: ({ normalizedText }) => normalizedText.length > 150
  },
  {
    key: 'core_intelligence_signals',
    points: 20,
    test: ({ normalizedText }) =>
      /risk|security|recommend|architecture|priority|findings|strategy|fix/i.test(normalizedText)
  },
  {
    key: 'formatted_response_signals',
    points: 15,
    test: ({ normalizedText }) =>
      /1\.|2\.|3\.|SYSTEM_VITAL_SIGNS|QUANTUM_FINDINGS|MULTIVERSE_STRATEGY|OMNI_FIXES/i.test(normalizedText)
  }
];

const PENALTY_RULES = [
  {
    key: 'failure_language',
    points: 25,
    test: ({ normalizedText }) =>
      /missing|error|unknown|failed|meltdown|as an AI|language model/i.test(normalizedText)
  }
];

function clampScore(score) {
  return Math.max(0, Math.min(100, score));
}

function buildVerdict(valid, score, reason, metrics = {}) {
  return {
    ok: valid,
    system: 'UNIVERSAL_DRAGON',
    core: 'NOVA_ARBITER',
    dimension: '7D_EVALUATION_LAYER',
    valid,
    score: clampScore(score),
    reason,
    metrics
  };
}

function normalizeOutput(output) {
  if (typeof output === 'string') {
    return {
      normalizedText: output.trim(),
      isStructured: false,
      rawType: 'string'
    };
  }

  if (output && typeof output === 'object') {
    return {
      normalizedText: JSON.stringify(output),
      isStructured: true,
      rawType: 'object'
    };
  }

  return {
    normalizedText: '',
    isStructured: false,
    rawType: typeof output
  };
}

function calculateRuleScore(rules, context) {
  return rules.reduce(
    (acc, rule) => {
      try {
        if (rule.test(context)) {
          acc.total += rule.points;
          acc.triggered.push(rule.key);
        }
      } catch {
        // Silent rule isolation: one faulty rule must not break the arbiter
      }
      return acc;
    },
    { total: 0, triggered: [] }
  );
}

export function evaluateOutput(output) {
  try {
    const { normalizedText, isStructured, rawType } = normalizeOutput(output);

    if (!normalizedText) {
      return buildVerdict(false, 0, 'VOID_RESPONSE', {
        raw_type: rawType,
        error: 'Empty payload received'
      });
    }

    const baseScore = 40;

    const bonusResult = calculateRuleScore(BONUS_RULES, {
      normalizedText,
      isStructured
    });

    const penaltyResult = calculateRuleScore(PENALTY_RULES, {
      normalizedText,
      isStructured
    });

    const finalScore = baseScore + bonusResult.total - penaltyResult.total;
    const approved = finalScore >= MINIMUM_PASS_SCORE;

    return buildVerdict(
      approved,
      finalScore,
      approved ? 'QUANTUM_APPROVAL_GRANTED' : 'INSUFFICIENT_DIMENSIONAL_QUALITY',
      {
        raw_type: rawType,
        structured: isStructured,
        base: baseScore,
        bonus: bonusResult.total,
        penalty: penaltyResult.total,
        triggered_bonus_rules: bonusResult.triggered,
        triggered_penalty_rules: penaltyResult.triggered,
        threshold: MINIMUM_PASS_SCORE
      }
    );
  } catch (error) {
    return buildVerdict(false, 0, 'ARBITER_SYSTEM_CRASH', {
      message: error?.message || 'Catastrophic failure in evaluation matrix'
    });
  }
}
