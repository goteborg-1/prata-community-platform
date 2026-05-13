import { useAuth } from "../context/AuthContext"
import { SettingsCard, SettingsDivider, SettingsRow } from "../components/SettingsCard/SettingsCard"
import Container from "../components/Container/Container"
import Button from "../components/Button/Button"

export default function Settings() {
  const { user } = useAuth()

  return(
    <div className="secondary-background">
      <Container>
        <h2>Inställningar</h2>

        <SettingsCard title="Konto">
          <SettingsRow label="Visningsnamn" description={user?.displayName}>
            <Button variant="transparent" size="small" onClick={() => console.log("Klick")}>Ändra</Button>
          </SettingsRow>

          <SettingsDivider />

          <SettingsRow label="Användarnamn" description={user?.handle}>
            <Button variant="transparent" size="small" onClick={() => console.log("Klick")}>Ändra</Button>
          </SettingsRow>

          <SettingsDivider />

          <SettingsRow label="Lösenord">
            <Button variant="transparent" size="small" onClick={() => console.log("Klick")}>Ändra</Button>
          </SettingsRow>
        </SettingsCard>

        <SettingsCard title="Utseende">
          <SettingsRow label="Tema">
            <span style={{display: "flex"}}>
              <Button variant="transparent" size="small" onClick={() => console.log("Klick")}>Ljust</Button>
              <Button variant="transparent" size="small" onClick={() => console.log("Klick")}>Mörkt</Button>
              <Button variant="transparent" size="small" onClick={() => console.log("Klick")}>Automatiskt</Button>
            </span>
          </SettingsRow>
        </SettingsCard>

        <SettingsCard title="Session">
          <SettingsRow label="Logga ut">
            <Button variant="transparent" size="small" onClick={() => console.log("Klick")}>Logga ut</Button>
          </SettingsRow>
        </SettingsCard>

        <SettingsCard title="Fara">
          <SettingsRow label="Ta bort konto" description="Permanent åtgärd, kan inte ångras">
            <Button variant="transparent" size="small" onClick={() => console.log("Klick")}>Ta bort</Button>
          </SettingsRow>
        </SettingsCard>
      </Container>
    </div>
  )
}