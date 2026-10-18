import React, { useEffect, useState } from 'react';
import { FiCamera, FiCheck, FiGift, FiHeart, FiPlus } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type Milestone } from '../../mockApi';
import { useDemoUi } from '../../components/DemoUi';

const gallery = ['👶', '🍼', '🌞', '🎈'];
const accentClasses: Record<string, string> = {
  rose: 'bg-rose-100 text-rose-500',
  amber: 'bg-amber-100 text-amber-500',
  sky: 'bg-sky-100 text-sky-500',
  emerald: 'bg-emerald-100 text-emerald-500'
};

export default function DevelopmentPage() {
  const { openDialog } = useDemoUi();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [memories, setMemories] = useState(() => gallery.map((emoji, index) => ({ id: `memory-${index}`, emoji })));

  useEffect(() => {
    let active = true;

    mockApi.getMilestones().then((items) => {
      if (active) setMilestones(items);
    });

    return () => {
      active = false;
    };
  }, []);

  const addMilestone = () => {
    openDialog({
      title: 'Nova conquista',
      description: 'Guarde um marco importante do desenvolvimento.',
      submitLabel: 'Salvar marco',
      fields: [
        { name: 'title', label: 'Conquista', type: 'text', placeholder: 'Ex.: bate palminhas', required: true },
        {
          name: 'category',
          label: 'Área',
          type: 'select',
          options: ['Motor', 'Linguagem', 'Interação social', 'Alimentação', 'Outro']
        },
        { name: 'date', label: 'Data', type: 'date', required: true }
      ],
      onSubmit: (values) => {
        const milestone = {
          id: `demo-${Date.now()}`,
          title: values.title,
          category: values.category,
          age: 'Novo registro',
          status: 'Adicionado hoje',
          accent: 'rose' as const
        };
        mockApi.addMilestone(milestone);
        setMilestones((current) => [milestone, ...current]);
        return 'Conquista adicionada à linha do tempo.';
      }
    });
  };

  const addMemory = () => {
    openDialog({
      title: 'Adicionar memória',
      description: 'Escolha um símbolo para representar uma foto nesta prévia local.',
      submitLabel: 'Adicionar memória',
      fields: [
        {
          name: 'memory',
          label: 'Memória',
          type: 'select',
          options: ['📸', '🧸', '🌈', '🌻', '🫧', '🎈']
        }
      ],
      onSubmit: (values) => {
        setMemories((current) => [{ id: `memory-${Date.now()}`, emoji: values.memory }, ...current]);
        return 'Memória adicionada à galeria da sessão.';
      }
    });
  };

  return (
    <AppShell
      title="Desenvolvimento"
      subtitle="Marcos, conquistas e memórias do crescimento."
      actions={
        <button
          type="button"
          onClick={addMilestone}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-200 hover:bg-rose-600"
        >
          <FiPlus />
          Novo marco
        </button>
      }
    >
      <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        Marcos e faixas exibidos são exemplos sem fontes ou validação clínica. A ausência de um marco registrado não
        indica atraso, e estas informações não substituem uma avaliação profissional.
      </p>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Marcos</div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Conquistas recentes</h2>
            </div>
            <div className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
              {milestones.length} marcos
            </div>
          </div>

          <div className="space-y-4">
            {milestones.map(({ id, title, category, age, status, accent }) => (
              <div key={id} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    accentClasses[accent] ?? 'bg-emerald-100 text-emerald-500'
                  }`}
                >
                  <FiGift />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-base font-medium text-slate-900">{title}</div>
                      <div className="text-xs text-slate-500">
                        {category} · {age}
                      </div>
                    </div>
                    <div className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-600">
                      {status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Galeria</div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Memórias</h2>
              <p className="mt-1 text-xs text-slate-500">Símbolos ilustrativos; envio privado de fotos indisponível.</p>
            </div>
            <button
              aria-label="Adicionar memória"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500"
              onClick={addMemory}
              type="button"
            >
              <FiCamera />
            </button>
          </div>

          <div className="mt-5 grid place-items-center grid-cols-2 gap-3">
            {memories.map(({ id, emoji }) => (
              <div
                key={id}
                className="flex select-none items-center flex-col justify-center bg-linear-to-br from-rose-50 to-amber-50 text-4xl shadow-inner ring-1 ring-slate-100"
              >
                <p className="size-48 mt-4 mx-4 mb-4 flex items-center justify-center bg-black">{emoji}</p>
                <p
                  className=" flex items-center justify-center text-sm mb-4 text-black font-serif
                "
                >
                  {id}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Linha do tempo</div>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Acompanhar evolução</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
            <FiCheck />
            Atualizado hoje
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {[
            'Sorriso espontâneo ao ouvir a voz da mãe — 12/03',
            'Primeira experiência com apoio para sentar — 08/02',
            'Observou o papai e começou a imitar sons — 01/02'
          ].map((entry) => (
            <div key={entry} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <FiHeart />
              </div>
              <div className="text-sm text-slate-600">{entry}</div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
