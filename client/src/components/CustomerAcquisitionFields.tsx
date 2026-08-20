import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CHILE_REGIONS,
  DISCOVERY_SOURCE_OPTIONS,
  type CustomerAcquisitionFormValue,
} from "@/lib/customerAcquisition";

type Props = {
  value: CustomerAcquisitionFormValue;
  onChange: (value: CustomerAcquisitionFormValue) => void;
  idPrefix?: string;
  compact?: boolean;
};

const selectClassName = "mt-2 h-12 w-full rounded-xl border border-[#BCBAB8] bg-white px-4 text-sm text-[#222221] outline-none focus:border-[#4B5872] focus:ring-2 focus:ring-[#4B5872]/15";

export function CustomerAcquisitionFields({ value, onChange, idPrefix = "purchase", compact = false }: Props) {
  const set = (patch: Partial<CustomerAcquisitionFormValue>) => onChange({ ...value, ...patch });

  return (
    <div className={compact ? "space-y-4" : "grid gap-5 md:grid-cols-2"}>
      <div>
        <Label htmlFor={`${idPrefix}-discovery`}>¿Cómo nos encontraste? *</Label>
        <select
          id={`${idPrefix}-discovery`}
          required
          value={value.discoverySource}
          onChange={(event) => set({ discoverySource: event.target.value as CustomerAcquisitionFormValue["discoverySource"], discoverySourceOther: "" })}
          className={selectClassName}
        >
          <option value="">Selecciona una opción</option>
          {DISCOVERY_SOURCE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        {value.discoverySource === "other" && (
          <Input
            className="mt-3 h-12 rounded-xl border-[#BCBAB8] bg-white"
            required
            value={value.discoverySourceOther}
            onChange={(event) => set({ discoverySourceOther: event.target.value })}
            placeholder="Cuéntanos cómo"
            aria-label="Otra forma en que nos encontraste"
          />
        )}
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-origin`}>¿De dónde vienes? *</Label>
        <select
          id={`${idPrefix}-origin`}
          required
          value={value.originType}
          onChange={(event) => set({ originType: event.target.value as CustomerAcquisitionFormValue["originType"], country: "", region: "", city: "" })}
          className={selectClassName}
        >
          <option value="">Selecciona una opción</option>
          <option value="chile">Chile</option>
          <option value="foreign">Extranjero</option>
        </select>
        {value.originType === "foreign" && (
          <Input
            className="mt-3 h-12 rounded-xl border-[#BCBAB8] bg-white"
            required
            autoComplete="country-name"
            value={value.country}
            onChange={(event) => set({ country: event.target.value })}
            placeholder="País"
          />
        )}
        {value.originType === "chile" && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <select
              required
              aria-label="Región"
              value={value.region}
              onChange={(event) => set({ region: event.target.value, city: "" })}
              className={selectClassName.replace("mt-2 ", "")}
            >
              <option value="">Selecciona región</option>
              {CHILE_REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}
            </select>
            <Input
              className="h-12 rounded-xl border-[#BCBAB8] bg-white"
              required
              autoComplete="address-level2"
              value={value.city}
              onChange={(event) => set({ city: event.target.value })}
              placeholder="Ciudad o comuna"
            />
          </div>
        )}
      </div>
    </div>
  );
}
