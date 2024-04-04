CREATE OR REPLACE FUNCTION public.dag_insert_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
	PERFORM
		pg_notify('dag_insert_notify', row_to_json(NEW)::text);
	RETURN new;
END;
$function$

CREATE OR REPLACE FUNCTION public.dag_update_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
	PERFORM
		pg_notify('dag_update_notify', row_to_json(NEW)::text);
	RETURN new;
END;
$function$


CREATE TRIGGER dag_insert_trigger AFTER insert ON dag
FOR EACH ROW EXECUTE PROCEDURE dag_insert_trigger();

CREATE TRIGGER dag_update_trigger AFTER UPDATE ON dag
FOR EACH ROW EXECUTE PROCEDURE dag_update_trigger();