import tkinter as tk
from datetime import datetime, timedelta

# Fecha y hora de inicio de las vacaciones (19 de diciembre a las 12:00 AM)
fecha_vacaciones = datetime(datetime.now().year, 12, 19, 0, 0, 0)

# Crear la ventana principal
ventana = tk.Tk()
ventana.title("Contador para las Vacaciones")

# Configurar la etiqueta para mostrar el tiempo restante
etiqueta = tk.Label(ventana, font=("Helvetica", 48), background="black", foreground="white")
etiqueta.pack(anchor='center')

# Función para calcular el tiempo restante hasta las vacaciones
def tiempo_restante():
    ahora = datetime.now()
    delta = fecha_vacaciones - ahora
    if delta.total_seconds() < 0:
        return "¡Ya estás de vacaciones!"
    dias, resto = divmod(delta.total_seconds(), 86400)
    horas, resto = divmod(resto, 3600)
    minutos, segundos = divmod(resto, 60)
    return f"{int(dias)} días, {int(horas):02d}:{int(minutos):02d}:{int(segundos):02d}"

# Función para actualizar el tiempo restante en la etiqueta
def actualizar_tiempo():
    tiempo = tiempo_restante()
    etiqueta.config(text=tiempo)
    etiqueta.after(1000, actualizar_tiempo)  # Actualizar cada segundo

# Llamar la función para actualizar el tiempo
actualizar_tiempo()

# Ejecutar la ventana principal
ventana.mainloop()