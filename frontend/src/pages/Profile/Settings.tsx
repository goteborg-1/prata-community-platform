import { useAuth } from "../../context/useAuth"
import { useDeleteProfile } from "../../hooks/useDeleteProfile"
import { useUpdateProfile } from "../../hooks/useUpdateProfile"
import { SettingsCard, SettingsDivider, SettingsRow } from "../../components/SettingsCard/SettingsCard"
import Container from "../../components/Container/Container"
import Button from "../../components/Button/Button"
import { useTheme } from "../../context/useTheme"
import { useState } from "react"
import Input from "../../components/Input/Input"
import c from "../../components/SettingsCard/SettingsCard.module.css"
import s from "./Settings.module.css"

export default function Settings() {
  const { user } = useAuth()
  const { mutate: deleteProfile } = useDeleteProfile()
  const { mutate: updateProfile, isPending } = useUpdateProfile()
  const { logout } = useAuth()
  const { setTheme } = useTheme()

  const [ editingField, setEditingField ] = useState<"displayName" | "handle" | "password" | null>(null)
  const [tempValue, setTempValue] = useState("")

  if(!user) return

  const handleEdit = (field: "displayName" | "handle" | "password", currentVal: string) => {
    setEditingField(field);
    setTempValue(currentVal);
  }

  const handleDelete = () => {
    if( window.confirm("Är du helt säker på att du vill ta bort ditt konto? Denna åtgärd går inte att ångra.")) {
      deleteProfile()
    }
  }

  const handleSave = () => {
    if (!editingField) return;
    
    updateProfile({ [editingField]: tempValue }, {
      onSuccess: () => setEditingField(null)
    })
  }

  return(
    <div className="secondary-background">
      <Container>
        <h2>Inställningar</h2>

        <SettingsCard title="Konto">
          {editingField === "displayName" ? (
            <form className={c.row}>
              <div>
                <span className={c.label}>Visningsnamn</span>
                <Input
                  autoFocus
                  variant="inLine"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
              </div>
              <div className={s.buttonWrapper}>
                <Button size="small" onClick={handleSave} disabled={isPending}>Spara</Button>
                <Button type="button" size="small" variant="transparent" onClick={() => setEditingField(null)}>Avbryt</Button>
              </div>
            </form>
          ) : (
            <SettingsRow label="Visningsnamn" description={user?.displayName}>
              <Button variant="transparent" size="small" onClick={() => handleEdit("displayName", user.displayName!)}>Ändra</Button>
            </SettingsRow>
          )}

          <SettingsDivider />

          {editingField === "handle" ? (
            <form className={c.row}>
              <div>
                <span className={c.label}>Användarnamn</span>
                <Input
                  autoFocus
                  variant="inLine"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
              </div>
              <div className={s.buttonWrapper}>
                <Button size="small" onClick={handleSave} disabled={isPending}>Spara</Button>
                <Button type="button" size="small" variant="transparent" onClick={() => setEditingField(null)}>Avbryt</Button>
              </div>
            </form>
          ) : (
            <SettingsRow label="Användarnamn" description={user?.handle}>
              <Button variant="transparent" size="small" onClick={() => handleEdit("handle", user.handle)}>Ändra</Button>
            </SettingsRow>
          )}

          <SettingsDivider />

          {!user?.googleId && (
            editingField === "password" ? (
              // TODO: Make password change safer
              <form className={c.row}>
                <div>
                  <span className={c.label}>Lösenord</span>
                  <Input
                    autoFocus
                    type="password"
                    variant="inLine"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                </div>
                <div className={s.buttonWrapper}>
                  <Button size="small" onClick={handleSave} disabled={isPending}>Spara</Button>
                  <Button type="button" size="small" variant="transparent" onClick={() => setEditingField(null)}>Avbryt</Button>
                </div>
              </form>
            ) : (
              <SettingsRow label="Lösenord">
                <Button variant="transparent" size="small" onClick={() => handleEdit("password", "")}>Ändra</Button>
              </SettingsRow>
            )
          )}

        </SettingsCard>

        <SettingsCard title="Utseende">
          <SettingsRow label="Tema">
            <span style={{display: "flex"}}>
              <Button variant="transparent" size="small" onClick={() => setTheme("light")}>Ljust</Button>
              <Button variant="transparent" size="small" onClick={() => setTheme("dark")}>Mörkt</Button>
              <Button variant="transparent" size="small" onClick={() => setTheme("system")}>Automatiskt</Button>
            </span>
          </SettingsRow>
        </SettingsCard>

        <SettingsCard title="Session">
          <SettingsRow label="Logga ut">
            <Button variant="transparent" size="small" onClick={logout}>Logga ut</Button>
          </SettingsRow>
        </SettingsCard>

        <SettingsCard title="Fara">
          <SettingsRow label="Ta bort konto" description="Permanent åtgärd, kan inte ångras">
            <Button variant="transparent" size="small" onClick={handleDelete}>Ta bort</Button>
          </SettingsRow>
        </SettingsCard>
      </Container>
    </div>
  )
}