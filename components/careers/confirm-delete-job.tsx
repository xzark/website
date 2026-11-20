"use client"
import { deleteJobAction } from "@/app/admin/careers/actions"
import { Button } from "@/components/ui/button"
export function ConfirmDeleteJob({id,title}:{id:string;title:string}){return <form action={deleteJobAction} onSubmit={(event)=>{if(!window.confirm(`Excluir a vaga “${title}”? Essa ação não pode ser desfeita.`))event.preventDefault()}}><input type="hidden" name="id" value={id}/><Button type="submit" size="sm" variant="destructive">Excluir</Button></form>}
